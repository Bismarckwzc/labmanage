var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    canshu: '',
  },
  shengcheng: function () {
    var courseId = app.globalData.courid;
    console.log(courseId);
    var data =  '';
    var that = this;
    var header = getApp().globalData.header;
    var getUrl = app.globalData.url;
    var flag = 1;
    // var util = require("utils/util.js");
    wx.request({
      url: getUrl + "/attend/getinfo",
      header: header,
      method: "POST",
      data:
      {
        "courseId": courseId,
        // "flag": 0  //待将来课堂真登陆时带入
        "courseId": '1',
        "flag": flag
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
              title: '参数请求成功',
            })
            data=res.data.data;
            //将'&'改为'|',因为&不识别
            var arr = '';
            arr = data.split('&');
            console.log(arr);
            data = '';
            for (var i = 0; i < arr.length; i++) {
              data += arr[i];
              if (i != arr.length - 1)
                data += '|'
            }
            data='2';
            console.log(data);
            wx.downloadFile({
              url: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=2',//+ data,
              success: function (res) {
                console.log(res)
                that.setData({
                  src: res.tempFilePath
                })
              },
              fail: function (err) {
                console.log(err)
              }
            })
          }
          else if (res.data.status == '500') {
            wx.showToast({
              icon: 'none',
              title: '参数请求失败',
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
    console.log('签到/退状态码：'+options.courid);//签到0
    var flag = options.courid;
    var courseId = app.globalData.courid;
    console.log(courseId);
    var data = '';
    var that = this;
    var header = getApp().globalData.header;
    var getUrl = app.globalData.url;
    var util = require("../../utils/util.js");
    wx.request({
      url: getUrl + "/attend/getinfo",
      header: header,
      method: "POST",
      data:
      {
        "courseId": courseId,
        // "flag": 0  //待将来课堂真登陆时带入
        // "courseId": '1',
        "flag": flag
      },//
      complete: function (res) {
        // console.log(res);
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        else {
          if (res.data.status == '200') {
            wx.showToast({
              title: '参数请求成功',
            })
            data = res.data.data;
            console.log(data);
            //将'&'改为'|',因为&不识别
            var arr='';
            arr = data.split('&');
            console.log(arr);
            data='';
            for(var i=0;i<arr.length;i++){
              data+=arr[i];
              if (i != arr.length-1)
               data+='|'
            }
            // var time;
            // console.log(arr[2]);
            // time = util.formatDate(arr[2],'Y/M/D h:m:s');
            // console.log(time);
            data = '2';
            console.log(data);//
            wx.downloadFile({
              url: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=2' ,//+ data,
              success: function (res) {
                console.log(res)
                that.setData({
                  src: res.tempFilePath
                })
              },
              fail: function (err) {
                console.log(err)
              }
            })
          }
          else if (res.data.status == '500') {
            wx.showToast({
              icon: 'none',
              title: '参数请求失败',
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