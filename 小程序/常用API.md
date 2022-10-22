# 常用API

#### 网络

##### wx.request()

发起 HTTPS 网络请求。参数：

**请求的接口,需要在微信公众平台上进行配置后才可以进行请求.**

| 属性         | 类型                      | 默认值 | 必填 | 说明                                                         | 最低版本                                                     |
| :----------- | :------------------------ | :----- | :--- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| url          | string                    |        | 是   | 开发者服务器接口地址                                         |                                                              |
| data         | string/object/ArrayBuffer |        | 否   | 请求的参数                                                   |                                                              |
| header       | Object                    |        | 否   | 设置请求的 header，header 中不能设置 Referer。 `content-type` 默认为 `application/json` |                                                              |
| method       | string                    | GET    | 否   | HTTP 请求方法                                                |                                                              |
| dataType     | string                    | json   | 否   | 返回的数据格式                                               |                                                              |
| responseType | string                    | text   | 否   | 响应的数据类型                                               | [1.7.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| success      | function                  |        | 否   | 接口调用成功的回调函数                                       |                                                              |
| fail         | function                  |        | 否   | 接口调用失败的回调函数                                       |                                                              |
| complete     | function                  |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |                                                              |

```javascript
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success (res) {
    console.log(res.data)
  }
})
```



#### 数据缓存

小程序可以将某些数据传入本地。类似于HTML5的本地存储。

```JavaScript
wx.setStorageSync
wx.setStorage
wx.removeStorageSync
wx.removeStorage
wx.getStorageSync
wx.getStorageInfoSync
wx.getStorageInfo
wx.getStorage
wx.clearStorageSync
wx.clearStorage
```

以上，方法名带Sync的是同步方法。不带的是异步方法。

同步方法：

```JavaScript
wx.setStorage({
  key:"key",
  data:"value"
})

wx.getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```

异步方法:

```JavaScript
wx.setStorage({
  key:"key",
  data:"value"
})
wx.getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```



#### 路由

小程序用以下API进行页面跳转

```
wx.switchTab
跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面

wx.reLaunch
关闭所有页面，打开到应用内的某个页面

wx.redirectTo
关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。

wx.navigateTo
保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。

wx.navigateBack
关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
```

```JavaScript
wx.switchTab({
  url: '/index'
})
--------------------------------------------------------------------
wx.reLaunch({
  url: 'test?id=1'
})
--------------------------------------------------------------------
wx.navigateTo({
  url: 'B?id=1'
})
// ------------------------------------------------------------------
// 在C页面内 navigateBack，将返回A页面
wx.navigateBack({
  delta: 2
})
```

**路由传参**

1：通过url传递.假设从页面A传递数据到页面B

```JavaScript
//A页面跳转到B页面,并且通过url传递数据a=10
wx.navigateTo({
    url: '../B/B?a=10',
})

```

```JavaScript
// B页面在onload中通过形参options接收从A页面传递过来的数据a=10
onLoad: function (options) {
    console.log('options', options);
},
```

2：通过eventChannel传参，假设从页面A传递数据到页面B

```javascript
//A页面跳转到B页面,并且通过url传递数据a=10
wx.navigateTo({
    url: '../B/B',
    // events选项声明一些自定义事件,在B页面可以选择性的触发这些事件并传递B页面的数据给A页面.
    events: {
        someEvent: function(data) {
            console.log('someEvent', data)
        }
    },
    // 跳转到页面B后触发success回调。此时触发B页面绑定的事件myevent，并传入数据{ data: 'test' }
    success: function(res) {
    	res.eventChannel.emit('myevent', { data: 'test' })
    }
})
```

```JavaScript
// B页面在onload中通过形参options接收从A页面传递过来的数据a=10
onLoad: function (options) {
    // 实例化eventChannel
    const eventChannel = this.getOpenerEventChannel();
	// 触发A页面的事件someEvent,并传入数据{data: 'sport'}给A页面
    eventChannel.emit('someEvent', {data: 'sport'})
	// 添加自定义事件myevent,这个事件在A页面的success回调中触发,接收到A页面的数据{ data: 'test' }
    eventChannel.on('myevent', (res) => {
    	console.log(res)
    })
},
```

