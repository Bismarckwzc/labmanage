// pages/createCou/createCou.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  setName: function (e) {
    this.setData({
      courseName: e.detail.value
    })
    console.log("姓名：" + e.detail.value);
  },
  setCode: function (e) {
    this.setData({
      setCode: e.detail.value//验证码
    })
  },
  setTeaName: function (e) {
    this.setData({
      teaName: e.detail.value//学生姓名
    })
  },
  loginBtnClick: function (e) {
    var courseName = this.data.courseName;
    console.log("姓名：" + courseName );
    var couid = this.data.setCode;
    var that;
    that = this;
    var userid = app.globalData.userid;
    var header = getApp().globalData.header;
    var getUrl = app.globalData.url;
    wx.request({
      url: getUrl + "/course/add",
      header: header,
      method: "POST",
      data:
      {
        "courseName": courseName,
        "courseTeacherId": userid,
        "id": couid
        // "courseName": "计算机导论",
        // "courseTeacherId": "1"
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
              title: '创建成功',
            })
            wx.navigateBack({
              delta: 1
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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