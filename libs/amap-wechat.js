module.exports = {
  getRegeo: function(options) {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var lnglat = res.longitude + ',' + res.latitude;
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo', 
          data: {
            key: options.key,
            location: lnglat,
            extensions: 'all',
            s: 'rsv3',
            platform: 'WXJS',
            appname: options.key,
            sdkversion: '1.0.0'
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(data) {
            if(data.data.status&&data.data.status=='1'){

              var regeoData = data.data.regeocode;
              var addressData = regeoData.addressComponent;
              var address = [];
              var poi = regeoData.roads[0].name + '附近';
              if (regeoData.pois && regeoData.pois[0]) {
                poi = regeoData.pois[0].name + '附近';
              }
              if (addressData.provice) {
                address.push(addressData.provice);
              }
              if (addressData.city) {
                address.push(addressData.city);
              }
              if (addressData.district) {
                address.push(addressData.district);
              }
              if (addressData.streetNumber && addressData.streetNumber.street && addressData.streetNumber.number) {
                address.push(addressData.streetNumber.street);
                address.push(addressData.streetNumber.number);
              } else {
                address.push(regeoData.roads[0].name);
              }
              address = address.join('');
              var result = [{
                iconPath: options.iconPath,
                width: options.iconWidth,
                height: options.iconHeight,
                name: address,
                desc: poi,
                longitude: res.longitude,
                latitude: res.latitude,
                id: 0,
                regeocodeData: regeoData
              }]
              options.success(result);
            }else{
              options.fail(data.data)
            }
          },
          fail: function(info) {
            options.fail({
              errCode: '0',
              errMsg: info.errMsg || ''
            })
          }
        })
      },
      fail: function(info){
        options.fail({
          errCode: '0',
          errMsg: info.errMsg || ''
        })
      }
    })
  },
  getWeather: function(options) {
    function getWeatherData(adcode){
      wx.request({
        url: 'https://restapi.amap.com/v3/weather/weatherInfo', 
        data: {
          key: options.key,
          city: adcode,
          extension: 'base',
          s: 'rsv3',
          platform: 'WXJS',
          appname: options.key,
          sdkversion: '1.0.0'
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function(data) {
          if(data.data.status&&data.data.status=='1'){
            var liveData = data.data.lives;
            var weatherData = {}
            if (liveData && liveData.length > 0) {
              var liveData = liveData[0];
              weatherData = {
                city: {
                  text: "城市",
                  data: liveData.city
                },
                weather: {
                  text: "天气",
                  data: liveData.weather
                },
                temperature: {
                  text: "温度",
                  data: liveData.temperature
                },
                winddirection: {
                  text: "风向",
                  data: liveData.winddirection + '风'
                },
                windpower: {
                  text: "风级",
                  data: liveData.windpower + '级'
                },
                humidity: {
                  text: "湿度",
                  data: liveData.humidity + '%'
                },
                liveData: liveData
              }
              options.success(weatherData)
            }
          }else{
            options.fail(data.data)
          }
        },
        fail: function(info) {
          options.fail({
            errCode: '0',
            errMsg: info.errMsg || ''
          })
        }
      })
    }
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var lnglat = res.longitude + ',' + res.latitude;
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo', 
          data: {
            key: options.key,
            location: lnglat,
            extensions: 'all',
            s: 'rsv3',
            platform: 'WXJS',
            appname: options.key,
            sdkversion: '1.0.0'
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(data) {
            if(data.data.status&&data.data.status=='1'){

              var adcode;
              var regeoData = data.data.regeocode;
              if (regeoData.addressComponent) {
                adcode = regeoData.addressComponent.adcode;
              } else if (regeoData.aois && regeoData.aois.length > 0) {
                adcode = regeoData.aois[0].adcode;
              }
              getWeatherData(adcode);
            }else{
              options.fail(data.data)
            }
          },
          fail: function(info) {
            options.fail({
              errCode: '0',
              errMsg: info.errMsg || ''
            })
          }
        })
      },
      fail: function(info){
        options.fail({
          errCode: '0',
          errMsg: info.errMsg || ''
        })
      }
    })
  },
  getPoiAround: function(options) {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var lnglat = res.longitude + ',' + res.latitude;
        wx.request({
          url: 'https://restapi.amap.com/v3/place/around', 
          data: {
            key: options.key,
            location: lnglat,
            s: 'rsv3',
            platform: 'WXJS',
            appname: options.key,
            sdkversion: '1.0.0'
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(data) {
            if(data.data.status&&data.data.status=='1'){

              var data = data.data
              if (data && data.pois) {
                var markers = [];
                for( var i = 0; i < data.pois.length; i++) {
                  var iconPath = i == 0 ? options.iconPathSelected : options.iconPath
                  markers.push({
                    latitude: data.pois[i].location.split(',')[1],
                    longitude: data.pois[i].location.split(',')[0],
                    iconPath: iconPath,
                    width: 22,
                    height: 32,
                    id: i,
                    name: data.pois[i].name,
                    address: data.pois[i].address
                  })
                }
                var poiData = {
                  markers: markers,
                  poisData: data.pois
                }
                options.success(poiData)
              }
            }else{
              options.fail(data.data)
            }
          },
          fail: function(info) {
            options.fail({
              errCode: '0',
              errMsg: info.errMsg || ''
            })
          }
        })
      },
      fail: function(info){
        options.fail({
          errCode: '0',
          errMsg: info.errMsg || ''
        })
      } 
    })
  }
}
