
# 请尊重视频制作者劳动成果，保护视频版权，不要用于违法用途


关于网页视频保存方案

这是一个html5在线视频流保存的折中方案。主要还是用在一些非主流网站使用了加密视频流，想保存其视频但是不想浪费时间在破解也不想使用录屏工具。可突破视频播放加速限制，任意修改播放倍速。

主流网站推荐使用[you-get](https://github.com/soimort/you-get)等优秀开源项目，使用m3u8的视频可以获取其链接使用[N_m3u8DL-CLI](https://github.com/nilaoda/N_m3u8DL-CLI)等项目或者直接FFMpeg进行保存

## 使用方法
在网页控制台输入
```javascript
javascript:void(function() { var scriptTag=document.createElement("script"); scriptTag.src='https://raw.githack.com/henkk-soft/Record-html5-video/main/Record%20video.js'; document.body.appendChild(scriptTag); })()
```

未做适配，只在谷歌浏览器上某些网站进行测试

参考链接：

https://webrtc.github.io/samples/

---

名字（ShiCheJiang）来源：造车匠于内开扇出半面视奉，奉即委去。后数十年于路见车匠，识而呼之。--《后汉书应奉传》
