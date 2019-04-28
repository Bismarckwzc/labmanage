// pages/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTea: false,
    course: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // change1: function (e) {
  //   var a=e.currentTarget.dataset.index
  //   console.log(a)
  //   this.setData({
  //     course: [{
  //       id: 1,
  //       couName: "Unix",
  //       teaName: "闫蕾",
  //       perNum: "54"
  //     },
  //       {
  //         id: 1,
  //         couName: "Unix",
  //         teaName: "闫蕾",
  //         perNum: "54"
  //       },
  //       {
  //         id: 1,
  //         couName: "Unix",
  //         teaName: "闫蕾",
  //         perNum: "54"
  //       }
  //     ],

  //   })
  // },
  goToCour: function(e) {
    console.log(e.currentTarget.dataset.couid)
    wx.navigateTo({
      url: '/pages/courDetail/courDetail?courid=' + e.currentTarget.dataset.couid,
    })
  },
  onLoad: function(options) {
    this.setData({
      course: [{
          id: 1,
          couName: "Unix",
          teaName: "闫蕾",
          perNum: "54"
        },
        {
          id: 1,
          couName: "Unix",
          teaName: "闫蕾",
          perNum: "54"
        },
        {
          id: 1,
          couName: "Unix",
          teaName: "闫蕾",
          perNum: "54"
        }
      ],

    })

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