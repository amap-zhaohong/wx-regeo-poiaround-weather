var amapFun = require('../../libs/amap-wechat.js')
Page({
  data: {
    weather: {}
  },
  onLoad: function() {
    var that = this;
    amapFun.getWeather({
      key: 'cb7451f9617b611b89c048ce5b34daa7',
      success: function(data){
        that.setData({
          weather: data
        });
      },
      fail: function(info){
        console.log(info)
      }
    })
  }
})