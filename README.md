###一、API使用方法
#####步骤一

在公众平台设置安全通讯域名,将高德web服务API地址（https://restapi.amap.com）加入request合法域名中。

#####步骤二

将API文件作为模块引入

  var amapFun = require('amap-wechat.js')
  
###二、DEMO地址

https://github.com/amap-demo/js-amap-wechat
  
###三、API方法详述
###1.逆地理编码
#####方法名：getRegeo(OBJECT)

#####OBJECT参数说明

参数名     | 说明 | 类型       | 是否必选 | 备注 |
| --------| ----|------|-------|----|
| key | 高德开发者key | String | 是 |
| iconPath | 标注的图标 | String  |  是 | 项目目录下的图片路径，支持相对路径写法 |
| width | 标注图标的宽度 | Number  |  否 | 默认为图片实际宽度|
| height | 标注图标的高度 | Number  |  否 | 默认为图片实际高度|
| success| 接口调用成功的回调函数 |Function| 否 | |
| fail | 接口调用失败的回调函数 |Function| 否 | |

#####代码示例

  amapFun.getRegeo({
      iconPath: "/img/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      key: '**',
      success: function(data){
        //返回使用微信map组件时，markers属性所需的数组
      }
    })



###2.周边POI搜索

#####方法名：getPoiAround(OBJECT)

#####OBJECT参数说明

参数名     | 说明 | 类型       | 是否必选 | 备注 |
| --------| ----|------|-------|----|
| key | 高德开发者key | String | 是 |
| iconPath | 未选中的图标 | String  |  是 | 项目目录下的图片路径，支持相对路径写法 |
| iconPathSelected | 选中的图标 | String  |  是 | 项目目录下的图片路径，支持相对路径写法 |
| width | 标注图标的宽度 | Number  |  否 | 默认为图片实际宽度|
| height | 标注图标的高度 | Number  |  否 | 默认为图片实际高度|
| success| 接口调用成功的回调函数 |Function| 否 | |
| fail | 接口调用失败的回调函数 |Function| 否 | |

#####代码示例
  amapFun.getPoiAround({
     key: '**',
      iconPathSelected: '/img/marker_checked.png',
      iconPath: '/img/marker.png',
      success: function(data){
        //返回使用微信map组件时，markers属性所需的数组
      }
    })
    

###3.天气
#####方法名：getWeather(OBJECT)

#####OBJECT参数说明

参数名     | 说明 | 类型       | 是否必选 | 备注 |
| --------| ----|------|-------|----|
| key | 高德开发者key | String | 是 |
| success| 接口调用成功的回调函数 |Function| 否 | |
| fail | 接口调用失败的回调函数 |Function| 否 | |

#####代码示例
  amapFun.getWeather({
    key: '**',
      success: function(data){
        //返回定位地点天气信息
      }
    })
### fail返回值说明
（1）高德webAPI服务错误，参考http://lbs.amap.com/api/webservice/guide/tools/info/
（2）微信小程序接口调用失败
  {
    errCode: '0',
    errMsg: 接口调用错误信息描述
  }