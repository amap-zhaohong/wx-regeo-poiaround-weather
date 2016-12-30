var amapFun = require('../../libs/amap-wechat.js')
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  onLoad: function() {
    var that = this;
    amapFun.getRegeo({
      key: 'cb7451f9617b611b89c048ce5b34daa7',
      iconPath: "../../../img/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function(data){
        that.setData({
          markers: data
        });
        that.setData({
          latitude: data[0].latitude
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc
          }
        })
      },
      fail: function(info){
        console.log(info)
      }
    })
  }
})