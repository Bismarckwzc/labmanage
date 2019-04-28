// pages/courDetail/courDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSign: false,
    signCode: "",
    notice: [],
    curTab: 0,
    flag: 0,
    groups: [],
    ingroup:[],
    tea: [],
    stu: [],
    checkingIn: [],
    selectPerson1: true,
    selectPerson2: true,
    selectGro1: true,
    selectGro2: true,
    selectGro4: true,
    selectArea: false,
  },
  scan1: function () {//应该解析二维码参数确定是签到码还是签退码
    var getuserId = app.globalData.userid;
    var header = getApp().globalData.header;
    var courseId = app.globalData.courid;
    var getUrl = app.globalData.url;
    // console.log(app.globalData.courid)
    // console.log(getuserId)
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        //   wx.showToast({
        //   title: res.result,
        // })
        // console.log(res)
        var arr = '';
        arr = res.result.split('|');
        console.log(arr);
        if(arr[3]=='0')
          var url = getUrl + '/attend/arrive';
        else if(arr[3] == '1')
          var url = getUrl + '/attend/leave';
        else
          return '二维码解析错误';
        wx.request({
          url: url,
          method: "POST",
          header: header,
          data: {
            "courseId": courseId,
            // "courseId": 1,
            // "userId": 17,//因为绑定本课堂的用户userid为1
            "userId": getuserId,
            "id": arr[1] //针对保存的二维码  
            // "courseId": 1,
            // "userId": 2,
            // "id": 1
            // check_in_code:res.result,
          },
          success: function (res1) {
            console.log(res1);
            if (res1.statusCode == '200') {
              if (res1.data.status == '200') {
                wx.showToast({
                  title: res1.data.data,
                })
              }
              if (res1.data.status = '500') {
                wx.showToast({
                  icon: 'none',
                  title: res1.data.data,
                })
              }
            }
            // wx.navigateBack();   //返回上一个页面
            // wx.navigateTo({
            //   url: '/pages/courDetail/courDetail',
            // })
          }
        })
      }
    })
  },
  // scan2: function () {
  //   var getAppInfo = app.globalData.openid;
  //   var getuserId = app.globalData.userid;
  //   var header = getApp().globalData.header;
  //   var getUrl = app.globalData.url;
  //   wx.scanCode({
  //     onlyFromCamera: true,
  //     success: function (res) {
  //       // wx.showToast({
  //       //   title: res.result,
  //       // })
  //       console.log(res)
  //       var courseId = app.globalData.courid;
  //       wx.request({
  //         url: getUrl + '/attend/leave',
  //         method: "POST",
  //         header: header,
  //         data: {
  //           // "courseId": 1,
  //           "courseId": courseId,
  //           "userId": getuserId,
  //           // "userId": 1,//因为绑定本课堂的用户userid为1
  //           'id': 12 //针对保存的二维码 第12此签退
  //           // "courseId": 1,
  //           // "userId": getAppInfo,
  //           // check_in_code:res.result,
  //         },
  //         success: function (res2) {
  //           if(res2.statusCode=='200'){
  //           if (res2.data.status == '200') {
  //             wx.showToast({
  //               title: res2.data.data,
  //             })
  //           }
  //           if (res2.data.status= '500') {
  //             wx.showToast({
  //               icon: 'none',
  //               title: res2.data.data,
  //             })
  //           }
  //           }
  //           console.log(res2);
  //           // wx.navigateBack();   //返回上一个页面
  //           // wx.navigateTo({
  //           //   url: '/pages/courDetail/courDetail',
  //           // })
  //         }
  //       })
  //     }
  //   })
  // },
  switch_: function (e) {
    // console.log(e);
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
  },
  goToNotice: function (e) {
    var a = e.currentTarget.dataset.index
    console.log(a)
    wx.navigateTo({
      url: '/pages/notice/notice?courid=' + e.currentTarget.dataset.couid,
    })
  },
  goToGroup: function (e) {
    var a = e.currentTarget.dataset.index
    console.log(a)
  },
  goTofz:function(e){
    var a = e.currentTarget.dataset.index
    console.log(a)
    wx.navigateTo({
      url: '/pages/ingro/ingro?courid=' + e.currentTarget.dataset.couid,
    })
  },
  groNam:function(e){
    var a = e.currentTarget.dataset.index
    console.log(a)
    var b = e.currentTarget.dataset.member[0][1]
    console.log(b)
  },

  clickPerson1: function () {
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
  clickGro1: function () {
    var selectGro = this.data.selectGro1;
    if (selectGro == true) {
      this.setData({
        selectArea: true,
        selectGro1: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectGro1: true,
      })
    }
  },
  clickGro2: function () {
    var selectGro = this.data.selectGro2;
    if (selectGro == true) {
      this.setData({
        selectArea: true,
        selectGro2: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectGro2: true,
      })
    }
  },
  clickGro3: function (e) {
    var selectGro = e.currentTarget.dataset.selectgro3;
    var id = e.currentTarget.dataset.couid;
    id=parseInt(id);
    console.log(selectGro);
    console.log(id);
    var param = {};
    var paramm={};
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
  clickGro4: function () {
    var selectGro = this.data.selectGro4;
    if (selectGro == true) {
      this.setData({
        selectArea: true,
        selectGro4: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectGro4: true,
      })
    }
  },

  //点击切换
  mySelect: function (e) {
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.courid)
    app.globalData.courid = options.courid;//存couid
    this.setData({
      // isTeacher:app.globalData.isTeacher
      isTeacher: true
    })
    this.setData({
      ingroup:[{
        name: "3组",
        id: 2,
        member: [{
          name: '甲'
        },
        {
          name: '乙'
        },
        {
          name: '丙'
        }],
      }]
    })
    this.setData({
      notice: [{
        noticeTitle: "周一不上课",
        teacher: "黄建才",
        time: "2019.2.28",
        commentNum: "2",
        id: 1
      }],
    })
    this.setData({
      groupsNum:[{
        ingroNum:'29',
        outgroNum:'5',
      }]
    })
    this.setData({
      // checkingIn: [{
      //   time: "2019.3.6",
      //   courNum: "1",
      //   courNam: "Unix",
      //   ischeckingin: true,
      //   ischeckingout: false,
      //   checkinTime: "19.30",
      //   checkoutTime: "21:30",
      // }],
    })
    this.setData({
      groups: [{
        name: "1组",
        id: 0,
        member:[{
          name:'甲'
          },
        {
          name:'乙'
          },
        {
          name:'丙'
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
    var courseId = options.courid;
    app.globalData.courid = courseId;
    console.log('进入课堂：' + app.globalData.courid)
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
            // wx.showToast({
            //   title: '老师',
            // })
            that.setData({
              courseName: res.data.data.courseName
            })
          }
          else if (res.data.status == '500') {
            // wx.showToast({
            //   icon: 'none',
            //   title: '学生',
            // })
          }
        }
      }
    })
    //查询课堂成员信息
    wx.request({
      url: getUrl + "/user/find",
      header: header,
      method: "POST",
      data:
      {
        "courseId": courseId,
        "flag": 2
        //  "courseId": 1,
        //  "flag": 2
      },//
      complete: function (res) {
        //  console.log(res);
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        else {
          if (res.data.status == '200') {
            wx.showToast({
              title: '成功',
            })
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
    //请求考勤列表
    //var util = require("utils/util.js");//时间戳
    wx.request({
      url: getUrl + "/attend/getbyuser",
      header: header,
      method: "POST",
      data:
      {
        "userId": userid,
        "courseId": courseId
        // "userId": 1,
        // "courseId": 1
      },//
      complete: function (res) {
        console.log(res);
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        else {
          if (res.data.status == '200') {
            // wx.showToast({
            //   title: '老师',
            // })
            that.setData({
              checkingIn: res.data.data
            })
            for(var i=0;i<res.data.data.length;i++){
              if (res.data.data[i].attendArriveTime!=undefined)
                that.setData({
                  ['checkingIn[' + i +'].ischeckingin']: true,
                })
              if (res.data.data[i].attendLeaveTime != undefined)
              that.setData({
                ['checkingIn[' + i + '].ischeckingout']: true,
              })
            }
            // console.log(checkingIn)
          }
          else if (res.data.status == '500') {
            // wx.showToast({
            //   icon: 'none',
            //   title: '学生',
            // })
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