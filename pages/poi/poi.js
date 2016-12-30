var amapFun = require('../../libs/amap-wechat.js')

var markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  makertap: function(e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData,id);
    that.changeMarkerColor(markersData,id);
  },
  onLoad: function() {
    var that = this;
    amapFun.getPoiAround({
      key: 'cb7451f9617b611b89c048ce5b34daa7',
      iconPathSelected: '../../../img/marker_checked.png',
      iconPath: '../../../img/marker.png',
      success: function(data){
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData,0);
      },
      fail: function(info){
        console.log(info)
      }
    })
  },
  showMarkerInfo: function(data,i){
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function(data,i){
    var that = this;
    var markers = [];
    for(var j = 0; j < data.length; j++){
      if(j==i){
        data[j].iconPath = "../../../img/marker_checked.png";
      }else{
        data[j].iconPath = "../../../img/marker.png";
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})