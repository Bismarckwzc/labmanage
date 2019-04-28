var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getAppInfo = app.globalData.openid;
    //判断是用户是否绑定了
    if (app.globalData.openid && app.globalData.openid != '') {
      this.setData({
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.employIdCallback = openid => {
        if (openid != '') {
          getAppInfo = app.globalData.openid;
          this.setData({
          });
          console.log(getAppInfo);
          this.setData({
            openid: getAppInfo,
          })
       //获取openid后自动登陆
          var that;
          that = this;
          var getAppInfo = app.globalData.openid;
          var header = getApp().globalData.header;
          var getUrl = app.globalData.url;
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
              console.log(res);
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
                    app.globalData.userid=res.data.data.id;//第一次请求后存userid为全局变量
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
                  wx.navigateTo({//账户不存在跳转到注册页面
                    url: '/pages/register/register',
                  })
                }
              }
            }
          })
        }
      }
    }
  },
  wxlogin: function (e) {
    //获取openid后自动登陆
    var that;
    that = this;
    var getAppInfo = app.globalData.openid;
    var header = getApp().globalData.header;
    var getUrl = app.globalData.url;
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
        console.log(res);
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
            wx.navigateTo({//账户不存在跳转到注册页面
              url: '/pages/register/register',
            })
          }
        }
      }
    })
  },

  wxlogout: function (e) {
    var that;
    that = this;
    var getAppInfo = app.globalData.openid;
    var header = getApp().globalData.header;
    var getUrl = app.globalData.url;
    wx.request({
      url: getUrl + "/user/logout",
      // url: "http://192.168.1.102:8083/user/logout",
      header: header,
      // header: {
      //   'Content-Type': 'application/json'//最后发现还是默认头不会出现405问题
      // },
      method: "POST",
      data:
      {
        "userWxid": getAppInfo,
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
        else {
          if (res.data.status == '200') {
            wx.showToast({
              title: '注销成功',
            })
            wx.navigateTo({
              url: '/pages/course/course?courid=' + e.currentTarget.dataset.couid,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})