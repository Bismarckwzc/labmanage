// pages/register/register.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    curTab:0,
    flag:0,
    winWidth:0,
    winHeight:0,
    teaName:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: 
  function (options) {
   var page=this;
   wx.getSystemInfo({
     success: function(res) {
       console.log(res);
       page.setData({winWidth: res.windowWidth});
       page.setData({winHeight: res.windowHeight });
     },
   })
   },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value//学生姓名
    })
  },
  teaNameInput: function (e) {
    this.setData({
      teaName: e.detail.value//教师姓名
    })
  },
  userNumInput: function (e) {
    this.setData({
      userNum: e.detail.value//学号
    })
  },
  userClassInput: function (e) {
    this.setData({
      userClass: e.detail.value//班级
    })
  },
  userMajorInput: function (e) {
    this.setData({
      userMajor: e.detail.value//专业
    })
  },
  loginBtnClick1: function (e) {
    console.log("姓名：" + this.data.teaName);
    var that;
    that = this;
    var getAppInfo = app.globalData.openid;
    var header = getApp().globalData.header;
    var getUrl = app.globalData.url;
    wx.request({
      url: getUrl + "/user/regis",
      header: header,
      method: "POST",
      data:
      {
        "userWxid": getAppInfo,
        "userName": this.data.teaName,
      },//
      complete: function (res) {
        console.log(res);
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        else {
          if (res.data.status == '200') {
            wx.showToast({
              title: '注册成功',
            })
            app.globalData.identity = '1';
            wx.request({
              url: getUrl + "/user/wxlogin",
              header: header,
              method: "POST",
              data:
              {
                "userWxid": getAppInfo,
              },
              complete: function (res) {
                // console.log(res);
                if (res == null || res.data == null) {
                  console.error('网络请求失败');
                  return;
                }
                else {
                  if (res.data.status == '200') {
                    wx.showToast({
                      title: '登陆成功',
                    })
                    if (res.header['Set-Cookie']) {
                      app.globalData.header.Cookie = res.header['Set-Cookie'];//第一次请求登陆后获取Set-Cookie.SESSIONID，存储
                      // console.log(res.header['Set-Cookie']);
                      // console.log(app.globalData.header.Cookie);。
                      app.globalData.userid = res.data.data.id;//第一次请求后存userid为全局变量
                      // console.log('userid:'+app.globalData.userid);
                    }
                    wx.navigateTo({//无法跳转，登陆成功跳转到course页面
                      url: '/pages/teaCourse/teaCourse',
                    })
                    // userid=res.data.id;
                    console.log('userid:' + app.globalData.userid);//全局变量
                  }
                  if (res.data.status == '500') {
                    wx.showToast({
                      icon: 'none',
                      title: res.data.error,
                    })
                  }
                }
              }
            })
            wx.navigateTo({//只有注册成功后才进入登陆页面
              url: '/pages/index/index',
            })
          }
          if (res.data.status == '500') {
            wx.showToast({
              icon: 'none',
              title: res.data.error,
            })
          }
        }
      }
    })
  },
  loginBtnClick2: function (e) {
    console.log("姓名：" + this.data.userName + " 学号：" + this.data.userNum + " 专业：" + this.data.userMajor + " 班级：" + this.data.userClass);
    var that;
    that=this;
    var getAppInfo = app.globalData.openid;
    var header = getApp().globalData.header;
    var getUrl = app.globalData.url;
    wx.request({
      url: getUrl + "/user/regis",
      // header: {
      //   'Content-Type': 'application/json'//最后发现还是默认头不会出现405问题
      //   // "content-type": "application/x-www-form-urlencoded" // "Content-Type": "application/x-www-form-urlencoded"
      // },
      header: header,
      method: "POST",
      data:
      {
        "userWxid": getAppInfo,
        "userName": this.data.userName,
        "userNum": this.data.userNum,
        "userMajor": this.data.userMajor,
        "userClass": this.data.userClass, 
         },//
      complete: function (res) {
        console.log(res);
        that.setData({
          // city_name: res.data.result.data.realtime.city_name,
        });
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        else{
        if (res.data.status == '200') {
          wx.showToast({
            title: '注册成功',
          })
          //获取openid后自动登陆
          // var that;
          // that = this;
          wx.request({
            url: getUrl + "/user/wxlogin",
            // url:"http://192.168.1.102:8083/user/wxlogin",
            header: header,
            // header: {
            //   'Content-Type': 'application/json'//最后发现还是默认头不会出现405问题
            // },
            method: "POST",
            data:
            {
              "userWxid": getAppInfo,
              // "userWxid": "2323232",
            },//
            complete: function (res) {
              // console.log(res);
              that.setData({
                // city_name: res.data.result.data.realtime.city_name,
              });
              if (res == null || res.data == null) {
                console.error('网络请求失败');
                return;
              }
              else {
                if (res.data.status == '200') {
                  wx.showToast({
                    title: '登陆成功',
                  })
                  if (res.header['Set-Cookie']) {
                    app.globalData.header.Cookie = res.header['Set-Cookie'];//第一次请求登陆后获取Set-Cookie.SESSIONID，存储
                    // console.log(res.header['Set-Cookie']);
                    // console.log(app.globalData.header.Cookie);。
                    app.globalData.userid = res.data.data.id;//第一次请求后存userid为全局变量
                    // console.log('userid:'+app.globalData.userid);
                  }
                  wx.navigateTo({//无法跳转，登陆成功跳转到course页面
                    // url: '/pages/course/course',
                    url: '/pages/teaCourse/teaCourse',
                  })
                  // userid=res.data.id;
                  console.log('userid:' + app.globalData.userid);//全局变量
                }
                if (res.data.status == '500') {
                  wx.showToast({
                    icon: 'none',
                    title: res.data.error,
                  })
                  // wx.navigateTo({//账户不存在跳转到注册页面
                  //   url: '/pages/register/register',
                  // })
                }
              }
            }
          })
          wx.navigateTo({//只有注册成功后才进入登陆页面
            url: '/pages/index/index',
          })
        }
        if (res.data.status == '500') {
          wx.showToast({
            icon: 'none',
            title: res.data.error,
          })
        }
        }
      }
    })
  },
  tz:function(e){//
    // var a = e.currentTarget.dataset.index
    // console.log(a)
    wx.navigateTo({
      // url: '/pages/teaCourse/teaCourse?courid=' + e.currentTarget.dataset.couid,
      url: '/pages/teaCourse/teaCourse',
    })
  },
  goTofz: function (e) {//
    // var a = e.currentTarget.dataset.index
    // console.log(a)
    wx.navigateTo({
      // url: '/pages/course/course?courid=' + e.currentTarget.dataset.couid,
      url: '/pages/index/index',
    })
  },
  switchNav:function(e){
    console.log(e);
    var page = this;
    var id = e.target.id;
    if (this.data.curTab == id) {
      return false;
    } else {
      page.setData({
        curTab: id
      })
    }
    page.setData({
      flag: id
    })
    // var page = this;
    // if(this.data.currentTab==e.target.dataset.current){
    //   return false;
    // }else{
    //   page.setData({ currentTab: e.target.dataset.current});
    // }
  },
  onReady: function () {
    
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})