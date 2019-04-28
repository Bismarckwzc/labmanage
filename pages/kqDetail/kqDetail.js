Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stu: [{
        name: "hhh",
        idNum: "100023"
      },
      {
        name: "rrr",
        idNum: "12000"
      }
      ],
      stu: [
        {
          name: "hhh",
          idNum: "100023",
          ischeckingin: true,
          ischeckingout: false,
          checkinTime: "19.30",
          checkoutTime: "21:30",
        },
        {
          name: "rrr",
          idNum: "12000",
          ischeckingin: true,
          ischeckingout: false,
          checkinTime: "19.40",
          checkoutTime: "22:30",
        }
      ],
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