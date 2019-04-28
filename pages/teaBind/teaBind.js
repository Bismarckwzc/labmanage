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
  onLoad:  
    function (options) {
      var page = this;
      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          page.setData({ winWidth: res.windowWidth });
          page.setData({ winHeight: res.windowHeight });
        },
      })
    },
  userPhoneInput: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },
    loginBtnClick1: function (e) {
      var that;
      that = this;
      var teacherPhone = this.data.userPhone;
      console.log("手机号：" + teacherPhone);
      var userid = app.globalData.userid;
      console.log('userid:' + userid);
      var header = getApp().globalData.header;
      var getUrl = app.globalData.url;
      wx.request({
        url: getUrl + "/teacher/bind",
        header: header,
        method: "POST",
        data:
        {
          "teacherPhone": teacherPhone,
          // "teacherPhone": "1234",
          "userId": userid
          // "userId": 2
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
                title: '绑定成功',
              })
              app.globalData.identity='1';
              wx.navigateTo({
                url: '/pages/createCou/createCou?courid=' + e.currentTarget.dataset.couid,
              })
            }
            else if (res.data.status == '500') {
              wx.showToast({
                icon: 'none',
                title: '绑定号码有误',
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