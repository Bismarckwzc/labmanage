// pages/teaCourDetail/teaCourDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectPerson1: true,
    selectPerson2: true,
    teaNotice: [],
    tea: [],
    stu: [],
    groups: [],
    checkingIn: [],
    curTab: 0,
    flag: 0,
    courseId: "",
    courseData: [],
    courseName:''
  },
  switch_: function(e) {
    // console.log(e);
    var page = this;
    var id = e.target.id;////
    console.log(id);
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
  },
  clickPerson1: function() {
    // //请求课堂具体信息
    // var userid = app.globalData.userid;//查看考勤情况用 学生
    // // console.log('userid:' + userid);
    // var courseId=app.globalData.courid;
    // var that;
    // that = this;
    // var header = getApp().globalData.header;
    // var getUrl = app.globalData.url;
    // wx.request({
    //   url: getUrl + "/course/find",
    //   header: header,
    //   method: "POST",
    //   data:
    //   {
    //     "id": courseId
    //     //  "id": 1
    //   },//
    //   complete: function (res) {
    //     console.log(res);
    //     if (res == null || res.data == null) {
    //       console.error('网络请求失败');
    //       return;
    //     }
    //     else {
    //       if (res.data.status == '200') {
    //         console.log(res.data.data)
    //         // that.setData({
    //         //   stu: res.data.data
    //         // })
    //       }
    //       else if (res.data.status == '500') {
    //         wx.showToast({
    //           icon: 'none',
    //           title: '学生',
    //         })
    //       }
    //     }
    //   }
    // })
    var selectPerson1 = this.data.selectPerson1;
    if (selectPerson1 == true) {
      this.setData({
        selectArea: true,
        selectPerson1: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson1: true,
      })
    }
  },
  clickPerson2: function () {
    //查询课堂成员信息
    var that;
    that = this;
    var header = getApp().globalData.header;
    var getUrl = app.globalData.url;
    var courseId = app.globalData.courid;
    wx.request({
      url: getUrl + "/user/find",
      header: header,
      method: "POST",
      data:
      {
         "courseId":courseId,
        //  "flag": 0
        // "courseId": '1',
        "flag": 2
      },//
      complete: function (res) {
        console.log(res);
        // wx.showLoading({
        //       title: '加载中',
        //     })//不好使
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        else {
          if (res.data.status == '200') {
            // wx.showToast({
            //   title: '成功',
            // })
            console.log(res.data.data)
            that.setData({
              stu: res.data.data
            })
          }
          else if (res.data.status == '500') {
            wx.showToast({
              icon: 'none',
              title: '错误',
            })
          }
        }
      }
    })
    var selectPerson2 = this.data.selectPerson2;
    if (selectPerson2 == true) {
      this.setData({
        selectArea: true,
        selectPerson2: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson2: true,
      })
    }
  },
  clickGro3: function (e) {
    var selectGro = e.currentTarget.dataset.selectgro3;
    var id = e.currentTarget.dataset.couid;
    id = parseInt(id);
    console.log(selectGro);
    console.log(id);
    var param = {};
    var paramm = {};
    var string = "groups[" + id + "].selectGro3";
    param[string] = false;
    paramm[string] = true;
    if (selectGro == true) {
      this.setData(param);
      this.setData({
        selectArea: true,
      })
    } else {
      this.setData(paramm);
      this.setData({
        selectArea: false,
      })
    }
  },
  mySelect: function(e) {
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    })
  },
  goToNotice: function(e) {
    var a = e.currentTarget.dataset.index
    console.log(a)
    wx.navigateTo({
      url: '/pages/notice/notice?courid=' + e.currentTarget.dataset.couid,
    })
  },
  goToKq0: function (e) {
    wx.navigateTo({
      url: '/pages/toKq/toKq?courid='+0,//签到
    })
  },
  goToKq1: function (e) {
    wx.navigateTo({
      url: '/pages/toKq/toKq?courid='+1,
    })
  },
  goTokqDil: function (e) {
    var a = e.currentTarget.dataset.index
    console.log(a)
    wx.navigateTo({
      url: '/pages/kqDetail/kqDetail?courid=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: 
   function(options) {
    this.setData({
      teaNotice: [{
          noticeTitle: "周一不上课",
          teacher: "黄建才",
          time: "2019.2.28",
          commentNum: "2",
          id: 1
        },
        {
          noticeTitle: "周一不上课",
          teacher: "闫蕾",
          time: "2019.2.28",
          commentNum: "2",
          id: 1
        }
      ],
    })
    this.setData({
      tea: [{
        name: "闫蕾",
        phone: "100023"
      },
      {
        name: "黄建才",
        phone: "12000"
      }
      ],
    })
    this.setData({
      stu: [{
      }
      ],
    })
    //分组
    this.setData({
      groups: [{
        name: "1组",
        id: 0,
        member: [{
          name: '甲'
        },
        {
          name: '乙'
        },
        {
          name: '丙'
        }],
        selectGro3: true,
      },
      {
        name: "2组",
        id: 1,
        member: [{
          name: '甲'
        },
        {
          name: '丙'
        },
        {
          name: '乙'
        }],
        selectGro3: true,
      },
      {
        name: "3组",
        id: 2,
        member: [{
          name: '乙'
        },
        {
          name: '甲'
        },
        {
          name: '丙'
        }],
        selectGro3: true,
      },
      {
        name: "4组",
        id: 3,
        member: [{
          name: '丙'
        },
        {
          name: '乙'
        },
        {
          name: '甲'
        }],
        selectGro3: true,
      }
      ],
    })
    //考勤
    this.setData({
      checkingIn: [{
        id:'1',
        time: "2019.3.6",
        courNum: "1",
        checkinNum: "29",
        checkoutNum: "3",
      }],
    })
    this.setData({
      courseData: [{
        groupId: "01",
        name: "01",
        child: [{
          stuId: "",
          stuName: "小明",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          },
          ],
          signNum: "3"
        }, {
          stuId: "02",
          stuName: "小红",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          }
          ],
          signNum: "3"
        },]
      }, {
        groupId: "01",
        name: "01",
        child: [{
          stuId: "",
          stuName: "小橙",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          },
          ],
          signNum: "3"
        }, {
          stuId: "02",
          stuName: "小黄",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          }
          ],
          signNum: "3"
        },]
      }, {
        groupId: "01",
        name: "01",
        child: [{
          stuId: "",
          stuName: "小绿",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          },
          ],
          signNum: "3"
        }, {
          stuId: "02",
          stuName: "小蓝",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          }
          ],
          signNum: "3"
        },]
      }, {
        groupId: "01",
        name: "小紫",
        child: [{
          stuId: "",
          stuName: "vfd",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          },
          ],
          signNum: "3"
        }, {
          stuId: "02",
          stuName: "小黑",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          }
          ],
          signNum: "3"
        },]
      }, {
        groupId: "02",
        name: "02",
        child: [{
          stuId: "03",
          stuName: "小花",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          }
          ],
          signNum: "3"
        }, {
          stuId: "04",
          stuName: "高兴义",
          grade: [{
            exId: "01",
            grade: "50"
          },
          {
            exId: "02",
            grade: "50"
          },
          {
            exId: "03",
            grade: "50"
          },
          {
            exId: "04",
            grade: ""
          },
          {
            exId: "05",
            grade: ""
          }
          ],
          signNum: "3"
        }]
      }]
    })
    var courseId = options.courid;
    app.globalData.courid = courseId;
     console.log('进入课堂：'+app.globalData.courid)
     //请求本课堂 签到人名的接口
     var userid = app.globalData.userid;
     // console.log('userid:' + userid);
     var that;
     that = this;
     var getAppInfo = app.globalData.openid;
     var header = getApp().globalData.header;
     var getUrl = app.globalData.url;
     //var util = require("utils/util.js");//时间戳
     wx.request({
       url: getUrl + "/attend/getnowlist",
       header: header,
       method: "POST",
       data:
       {
         "courseId": courseId,
         "id": 1
        //  "courseId": 1,
        //  "id": 1
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
           }
           else if (res.data.status == '500') {
             wx.showToast({
               icon: 'none',
               title: '学生',
             })
           }
         }
       }
     })
     //请求课堂具体信息
     var userid = app.globalData.userid;//查看考勤情况用 学生
     // console.log('userid:' + userid);
     var that;
     that = this;
     var header = getApp().globalData.header;
     var getUrl = app.globalData.url;
     wx.request({
       url: getUrl + "/course/find",
       header: header,
       method: "POST",
       data:
       {
         "id": courseId
        //  "id": 1
       },//
       complete: function (res) {
         console.log(res);
         if (res == null || res.data == null) {
           console.error('网络请求失败');
           return;
         }
         else {
           if (res.data.status == '200') {
            //  wx.showToast({
            //    title: '老师',
            //  })
            app.globalData.courseAttendSum=res.data.data.courseAttendSum;
            that.setData({
              courseName:res.data.data.courseName
            })
           }
           else if (res.data.status == '500') {
            //  wx.showToast({
            //    icon: 'none',
            //    title: '学生',
            //  })
           }
         }
       }
     })
    //  //查询课堂成员信息
    //  wx.request({
    //    url: getUrl + "/user/find",
    //    header: header,
    //    method: "POST",
    //    data:
    //    {
    //     //  "courseId":courseId,
    //     //  "flag": 0
    //      "courseId": '1',
    //      "flag": 2
    //    },//
    //    complete: function (res) {
    //      console.log(res);
    //      if (res == null || res.data == null) {
    //        console.error('网络请求失败');
    //        return;
    //      }
    //      else {
    //        if (res.data.status == '200') {
    //          wx.showToast({
    //            title: '成功',
    //          })
    //          console.log(res.data.data)
    //          that.setData({
    //            stu:res.data.data
    //          })
    //        }
    //        else if (res.data.status == '500') {
    //          wx.showToast({
    //            icon: 'none',
    //            title: '错误',
    //          })
    //        }
    //      }
    //    }
    //  })
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