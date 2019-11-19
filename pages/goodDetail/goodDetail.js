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
  // 加入购物车
  addToCart() {
    // 先获取本地存储的购物车信息
    const storage = wx.getStorageSync('goodBuy13') || [];
    // 取出当前的商品信息
    const{
      goods_id,
      goods_price,
      goods_name,
      goods_small_logo,
    } = this.data.goodsDate;
    // 查询本地存储的购物车信息是否存在当前商品
    const flag = storage.findIndex( v => {
      return v.goods_id === goods_id
    });
    // 如果本地存储的购物车信息没有当前商品 则加入并存入本地
    // 如果有 商品数量加一
    if(flag === -1){
      storage.push({
        goods_id,
        goods_price,
        goods_name,
        goods_small_logo,
        // 商品的选择信息
        good_status: true,
        // 商品数量 初始化为1
        good_num: 1
      });
    } else {
      storage[flag].good_num += 1;
    }
    // 数据存入本地
    wx.setStorageSync('goodBuy13', storage);
    console.log(storage);

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
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