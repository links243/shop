Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrl: [],     // 轮播图的数据
    catitemsData: [],     // 导航栏分类的数据
    floorData: []         // 楼层的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (res) => {     //箭头函数解决this指向的问题
        this.setData({
          swiperImgUrl: res.data.message
        })
      }
    }),
    // 请求分类数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: (res) => {     //箭头函数解决this指向的问题
        this.setData({
          catitemsData: res.data.message
        })
      }
    }),
    // 请求楼层数据
      wx.request({
        url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
        success: (res) => {     //箭头函数解决this指向的问题
          this.setData({
            floorData: res.data.message
          })
          console.log(res)
        }
      })
  },
  // 自定义事件处理函数，用于实现返回顶部的
  goToTop(e) {
    console.log('事件被触发了', e.currentTarget.dataset);
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 1000
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