import {myRequest} from "../../utils/myRequest"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: 53947,
    goodsDate: [],
    previewImageUrl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.setData({goods_id});
    // 发起请求
    this.getGoodsDetail();
  },

  // 获取商品详情信息
  getGoodsDetail() {
    const {goods_id} = this.data;
    myRequest({
      url: 'goods/detail',
      data: {
        goods_id
      }
    })
    .then(res => {
      // 单独提取新窗口预览图需要的图片连接
      let preImgTemp = [];
      res.pics.forEach(v => {
        preImgTemp.push(v.pics_big);
      });
      this.setData({
        goodsDate: res,
        previewImageUrl: preImgTemp
      });
    })
  },
  // 在新窗口预览图片
  previewImage(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: this.data.previewImageUrl // 需要预览的图片http链接列表
    });
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