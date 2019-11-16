import { myRequest } from '../../utils/myRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类列表的索引
    activeIndex: 0,
    // 获取的所有分类数据
    category: [],
    // 分类里的二级数据
    rightDate: [],
    // 二级栏目距离顶端的距离
    rightTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateData();
  },
  // 切换栏目列表
  getActive: function (event) {
    const index = event.currentTarget.dataset.index
    this.setData({
      activeIndex: index,
      // 切换栏目列表后 重新给二级数据赋值
      rightDate: this.data.category[index].children,
      rightTop: 0
    })
  },
  // 请求全部分类数据 弹出加载动画
  getCateData() {
    // 调用自己封装的myRequset函数 内部返回promise实例
    myRequest({
      url: 'categories'
    })
      .then(res => {
        this.setData({
          category: res,
          rightDate: res[0].children,
          rightTop: 0,
          activeIndex: 0
        })
      })
    // wx.showLoading({
    //   title: '加载中',
    // })
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/categories',
    //   success: (res) => { // 请求成功
    //     this.setData({
    //       category: res.data.message,
    //       rightDate: res.data.message[0].children,
    //       rightTop: 0,
    //       activeIndex: 0
    //     })
    //   },
    //   // 请求失败的回调函数
    //   fail: err => {
    //     console.log('请求失败的业务逻辑', err);
    //   },
    //   complete: (res) => { // 不管请求是否成功都执行
    //     wx.stopPullDownRefresh();
    //     wx.hideLoading();
    //   }
    // })
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
    this.getCateData();
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