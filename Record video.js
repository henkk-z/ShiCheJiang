var style = document.createElement("style");
style.appendChild(document.createTextNode("div#ddd{  width: 280px;height: 100px;background: rgb(255, 255, 255);box-shadow: 0px 2px 19px 0px rgb(0 0 0 / 12%);display: block;position: fixed;bottom: 0;z-index: 999999;opacity: .8;}"));
var head = document.getElementsByTagName("head")[0];
head.appendChild(style);
let f_js=document.createElement('div');
f_js.id="ddd"
document.body.appendChild(f_js);
f_js=document.getElementById('ddd');
let temp=document.createElement('input');
temp.id="f_elem";
temp.value="video";
f_js.appendChild(temp)
temp=document.createElement('input');
temp.id="f_speed";
temp.type="number";
temp.step=1;
temp.oninput=setSpeed;
temp.min=1;
temp.max=10;
temp.value=1;
f_js.appendChild(temp)
temp=document.createElement('br');
f_js.appendChild(temp);
// temp=document.createElement('video');
// temp.id="rightVideo";
// temp.setAttribute('playsinline',"");
// temp.setAttribute('autoplay',"");
// f_js.appendChild(temp);
temp=document.createElement('button');
temp.id="record";
temp.textContent="Start Recording";
f_js.appendChild(temp);
temp=document.createElement('button');
temp.id="pause";
temp.disabled=true;
temp.textContent="Pause";
f_js.appendChild(temp);
temp=document.createElement('button');
temp.id="download";
temp.disabled=true;
temp.textContent="Download";
f_js.appendChild(temp);

let videoType;
const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

const video =document.getElementsByTagName('video')[0];
//const video = document.querySelector('video');

const recordButton = document.querySelector('button#record');
const pauseButton = document.querySelector('button#pause');
const downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecording;
pauseButton.onclick = pause;
downloadButton.onclick = download;

const stream = video.captureStream(); // frames per second
console.log('Started stream capture from video element: ', stream);

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}
function setSpeed(){

    video.playbackRate=document.getElementById("f_speed").value;
    console.log("speed:  "+video.playbackRate);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}
function handleStop(event) {
  console.log('Recorder stopped: ', event);
  const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
 // video.src = window.URL.createObjectURL(superBuffer);
}

function toggleRecording() {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    downloadButton.disabled = false;
  }
}

// The nested try blocks will be simplified when Chrome 47 moves to Stable
function startRecording() {

    let options = {mimeType: 'video/webm'};
    recordedBlobs = [];
    try {
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e0) {
      console.log('Unable to create MediaRecorder with options Object: ', e0);
      try {
        options = {mimeType: 'video/webm;codecs=h264'};
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e1) {
        console.log('Unable to create MediaRecorder with options Object: ', e1);
        try {
          options = 'video/vp8'; // Chrome 47
          mediaRecorder = new MediaRecorder(stream, options);
        } catch (e2) {
          alert('MediaRecorder is not supported by this browser.\n\n' +
            'Try Firefox 29 or later, or Chrome 47 or later, ' +
            'with Enable experimental Web Platform features enabled from chrome://flags.');
          console.error('Exception while creating MediaRecorder:', e2);
          return;
        }
      }
    }
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  pauseButton.disabled = false;
  downloadButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(); // collect 100ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  pauseButton.textContent=="Pause";
  pauseButton.disabled==true;
  console.log('Recorded Blobs: ', recordedBlobs);
  //video.controls = true;
}

function pause() {
    if(pauseButton.textContent=="Pause"){
        pauseButton.textContent="Resume";
        console.log("Pause")
    mediaRecorder.pause();
    
}
else{
    mediaRecorder.resume();
    console.log("resume")
    pauseButton.textContent="Pause";
}
}

function download() {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  let myDate = new Date();
  a.download = myDate.toLocaleDateString()+'.mp4';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}