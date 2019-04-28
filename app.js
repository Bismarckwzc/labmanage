//app.js
App({
  globalData: {
    userInfo: null,
    isTeacher: false,
    userid:'',
    identity: '0',
    courid:'',
    courseAttendSum:'',
    header: { 'Content-Type': 'application/json','Cookie': '' },
    // url:'http://39.105.19.4:8083'
    url:'https://labmanage.littlee.top:8083'
  },
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    wx.login({
      success: function (loginRes) {
         console.log('code:'+loginRes.code);
         if (loginRes.code) {
           var code = loginRes.code;
           // example: 081LXytJ1Xq1Y40sg3uJ1FWntJ1LXyth
           //获取openid sessionkey
             let APPID = 'wxb6b334d260fa4495';
             let SECRET = 'd538af0a1b06f20c6c81c75e2ebcb2dc';
             let JSCODE= code;
             let grant_type='authorization_code';
             let getUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid='+APPID+'&secret='+SECRET+'&js_code='+JSCODE+'&grant_type=authorization_code';
             wx.request({
               url: getUrl,
               data: {
               },
               header: {
                 'content-type': 'application/json' // 默认值
               },
               method: 'GET',
               success: function (res) {
                  console.log('session_key:'+res.data.session_key);
                  console.log('openid:'+res.data.openid);
                 that.globalData.openid = res.data.openid+'036';//23学生36老师删改openid  ******！！！！在此处修改注册号！@！！！！！******* 36之后基本都没注册
                 if (that.employIdCallback) {
                   that.employIdCallback(res.data.openid);
                 }
                //  console.log(that.globalData.openid);
               },
               fail:function(res){
                  console.log(res);
               }
             })
        //     var opt = {
        //       method: 'GET',
        //       url: 'https://api.weixin.qq.com/sns/jscode2session',
        //       params: {
        //         appid: appid,
        //         secret: appSecret,
        //         js_code: code,
        //         grant_type: 'authorization_code'
        //       }
        //     };
        //     return http(opt).then(function (response) {
        //       var data = response.data;
        //       if (!data.openid || !data.session_key || data.errcode) {
        //         return {
        //           result: -2,
        //           errmsg: data.errmsg || '返回数据字段不完整'
        //         }
        //       } else {
        //         return data
        //       }
        //     });
             //}
         }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
})