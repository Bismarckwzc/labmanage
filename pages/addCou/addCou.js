// pages/addCou/addCou.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  addCourse: function() {
    // console.log(this.data.code)
    if(this.data.code!=""){
    var header = getApp().globalData.header;
    var userid = app.globalData.userid;
    var courseId = app.globalData.courid;
    var getUrl = app.globalData.url;
    wx.request({
      url: getUrl+"/courseuser/getin",
      // url: "http://39.105.19.4:8083/course/find",
      header: header,
      method: "POST",
      data:
      {
        "courseId": this.data.code,
        "userId": userid
        // "courseId": 1,
        // "userId": 17
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
                 title: '加入成功',
              })
            wx.navigateBack({
              delta: 1
            })
            }
         else if (res.data.status == '500') {
            wx.showToast({
              icon: 'none',
              title: res.data.error,
            })
            // wx.navigateTo({
            //   url: '/pages/teaBind/teaBind?courid=' + e.currentTarget.dataset.couid,
            // })
          }
        }
      } 
    })
    }
  },
  codeInp: function(e) {
    this.setData({
      code:e.detail.value
    })
  },
 
  onLoad: function(options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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