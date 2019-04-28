// pages/teaCourse/teaCourse.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: [],
    postiton:''
  },
  goToCour: function (e) {
    var courseId = e.currentTarget.dataset.couid;
     //加入课堂，通过courseid（id）进入课堂
    var that;
    that = this;
    var identity = app.globalData.identity;
    if (identity == '1') {
      wx.navigateTo({
        url: '/pages/teaCourDetail/teaCourDetail?courid=' + e.currentTarget.dataset.couid,
      })
      // console.log(e.currentTarget.dataset.couid);
    }
    else if (identity == '0') {
      wx.navigateTo({
        url: '/pages/courDetail/courDetail?courid=' + e.currentTarget.dataset.couid,
      })
    }
  },
  creatCou:function(e){
    //新建课堂，获取全局变量确认老师身份
        var that;
        that = this;
        var identity = app.globalData.identity;
        if (identity == '1') {
              wx.showToast({
                 title: '身份核实',
              })
         wx.navigateTo({
              url: '/pages/createCou/createCou?courid=' + e.currentTarget.dataset.couid,
              })
        }
        else if (identity == '0') {
            wx.showToast({
              icon: 'none',
              title: '请绑定教师号',
            })
        wx.navigateTo({
              url: '/pages/teaBind/teaBind?courid=' + e.currentTarget.dataset.couid,
            })
        }
  },
  addCou: function (e) {
    //加入课堂，获取全局变量确认老师身份，老师直接加，学生判断信息是否完整，完整再加
    var that;
    that = this;
    var identity = app.globalData.identity;
    if (identity == '1') {
            wx.showToast({
              title: '身份核实',
            })
            wx.navigateTo({
              url: '/pages/addCou/addCou?courid=' + e.currentTarget.dataset.couid,
            })
          }
          else if (identity == '0') {//是学生的话补全信息，尚未提供接口先直接转，加入课堂
            wx.showToast({
              icon: 'none',
              title: '教师号未绑定',
            })
            wx.navigateTo({
              url: '/pages/addCou/addCou?courid=' + e.currentTarget.dataset.couid,
            })
          }
  },
  onLoad: function(options) {
    this.setData({
    })
    //查看用户身份
      //新建课堂，获取userid确认老师身份
      var userid = app.globalData.userid;
      // console.log('userid:' + userid);
      var that;
      that = this;
      var getAppInfo = app.globalData.openid;
      var header = getApp().globalData.header;
      var getUrl = app.globalData.url;
      wx.request({
        url: getUrl + "/teacher/ifteacher",
        header: header,
        method: "POST",
        data:
        {
          "id": userid
          // "id": 3
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
                title: '老师',
              })
              app.globalData.identity ='1';//1教师
              that.setData({
                postiton: '教师'
              })
            }
            else if (res.data.status == '500') {
              wx.showToast({
                icon: 'none',
                title: '学生',
              })
              app.globalData.identity = '0';//0学生
              that.setData({
                postiton: '学生'
              })
            }
          }
        }
      })
    // //发起请求，查看用户课堂列表
    // wx.request({
    //   url: "http://39.105.19.4:8083/courseuser/getcourselist",
    //   header: header,
    //   method: "POST",
    //   data:
    //   {
    //     "userId": userid,
    //     // "userId": 17,
    //     "status": 0
    //   },//
    //   complete: function (res) {
    //     console.log(res);
    //     if (res == null || res.data == null) {
    //       console.error('网络请求失败');
    //       return;
    //     }
    //     else {
    //       // console.log(res);
    //       if (res.data.status == '200') {
    //         wx.showToast({
    //           title: '成功',
    //         })
    //         that.setData({
    //           course: res.data.data
    //         })
    //       }
    //       else if (res.data.status == '500') {//是学生的话补全信息，尚未提供接口先直接转，加入课堂
    //         wx.showToast({
    //           icon: 'none',
    //           title: res.data.error,
    //         })
    //       }
    //     }
    //   }
    // })
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
    //发起请求，查看用户课堂列表
    var that;
    that = this;
    var header = getApp().globalData.header;
    var userid = app.globalData.userid;
    console.log(userid);
    var getUrl = app.globalData.url;
    wx.request({
      url: getUrl + "/courseuser/getcourselist",
      header: header,
      method: "POST",
      data:
      {
        "userId": userid,
        // "userId": 17,
        "status": 0
      },//
      complete: function (res) {
        console.log(res);
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        else {
          // console.log(res);
          if (res.data.status == '200') {
            wx.showToast({
              // title: '成功',
            })
            // for(var i=0;i<res.data.data.length;i++){
              // console.log(course.length)
               that.setData({ 
                 course: res.data.data
                //  ['course[' + that.course.length+']']: res.data.data[i]
               })
            // }
          }
          else if (res.data.status == '500') {//是学生的话补全信息，尚未提供接口先直接转，加入课堂
            wx.showToast({
              icon: 'none',
              title: res.data.error,
            })
          }
        }
      }
    })
    // wx.request({
    //   url: "http://39.105.19.4:8083/course/findlist ",
    //   header: header,
    //   method: "POST",
    //   data:
    //   {
    //     "courseTeacherId": userid,
    //     "courseStatus": 0
    //     // "courseTeacherId": 1,
    //     // "courseStatus": 0
    //   },//
    //   complete: function (res) {
    //     console.log(res);
    //     if (res == null || res.data == null) {
    //       console.error('网络请求失败');
    //       return;
    //     }
    //     else {
    //       // console.log(res);
    //       if (res.data.status == '200') {
    //         wx.showToast({
    //           // title: '成功',
    //         })
    //         // for (var i = 0; i < res.data.data.length;i++){
    //         // that.data.course.push(res.data.data[i]);
    //         // }
    //         // console.log(that.data.course) 
    //         // for (var i = 0; i < res.data.data.length; i++) {
    //         //   that.setData({
    //         //     ['course[' + that.course.length + ']']: res.data.data[i]
    //         //   })
    //         // }
    //       }
    //       else if (res.data.status == '500') {//是学生的话补全信息，尚未提供接口先直接转，加入课堂
    //         wx.showToast({
    //           icon: 'none',
    //           title: res.data.error,
    //         })
    //       }
    //     }
    //   }
    // })
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