var amapFile = require('../../libs/amap-wechat.js')
Page({
  data: {
    weather: {}
  },
  onLoad: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'cb7451f9617b611b89c048ce5b34daa7'});
    myAmapFun.getWeather({
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