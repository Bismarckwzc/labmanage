// pages/collGrade/collGrade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId: "",
    courseData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      courseData: [{
        groupId: "01",
        name: "01",
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
          stuName: "少乘法",
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
            stuName: "少乘法",
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
            stuName: "少乘法",
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
            stuName: "少乘法",
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
          stuName: "奥星一",
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  setGrade:function(e){
    console.log(e)
    var grade = e.detail.value
    var s = "courseData[" + e.target.dataset.gindex + "].child[" + e.target.dataset.pindex + "].grade[" + e.target.dataset.grindex+"].grade"
    this.setData({
      [s]:e.detail.value
    })
    console.log(this.data.courseData)
  },
  sub:function(){
    
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