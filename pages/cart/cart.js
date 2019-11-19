// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartData: [],
    totalMoney: 0,
    totalCount: 0,
    checkAll: true,
    address: {}
  },

  /**
   * 购物车加减数量
   */
  changeCount(e) {
    const { number, index } = e.currentTarget.dataset;
    const { cartData } = this.data;

    // cartData[index].good_num += number;
    // 判断数量是否越界
    // if (cartData[index].good_num === 0) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '这是一个模态弹窗',
    //     success (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    //   ++cartData[index].good_num;
    // }

    // 另一种判断方式
    if (cartData[index].good_num === 1 && number === -1) {
      wx.showModal({
        title: "提示",
        content: "是否要删除商品",
        success: res => {
          if (res.confirm) {
            cartData.splice(index, 1);
            this.updateCart(cartData);
          }
        }
      });
    } else {
      cartData[index].good_num += number;
      this.updateCart(cartData);
    }
  },

  /**
   * 商品信息的单选按钮
   */
  changeCheck(e) {
    const { index } = e.currentTarget.dataset;
    const { cartData } = this.data;
    cartData[index].good_status = !cartData[index].good_status;
    this.updateCart(cartData);
  },

  /**
   * 全选按钮
   */
  changeCheckAll() {
    let { checkAll, cartData } = this.data;
    checkAll = !checkAll;
    cartData.forEach(v => {
      v.good_status = checkAll;
    });
    this.setData({
      checkAll
    });
    this.updateCart(cartData);
  },

  /**
   * 添加收获地址
   */
  getAddressHandle() {
    console.log(11);
    wx.getSetting({
      success: res => {
        // 如果用户未授权
        if (res.authSetting["scope.address"] === false) {
          // 打开设置 引导用户授权
          wx.openSetting({
            success: res => {
              if (res.authSetting["scope.address"] === true) {
                // 已经授权，通过 API 方式调用收货地址
                // this.chooseAddressMain();
                console.log("已经授权");
                this.chooseAddressMain();
              }
            }
          });
        } else {
          console.log("已经授权222");
          this.chooseAddressMain();
        }
      }
    });
  },

  /**
   * 选择收货地址的核心功能
   */
  chooseAddressMain() {
    // 调用起微信内置的收货地址功能 - 微信原生的界面 - 开发者不可编辑
    wx.chooseAddress({
      // 用户点击了收货地址
      success: res => {
        // 解构收货地址核心信息
        const {
          userName,
          telNumber,
          provinceName,
          cityName,
          countyName,
          detailInfo,
          postalCode
        } = res;
        // 组装成自己需要的格式
        const address = {
          userName,
          telNumber,
          postalCode,
          addressDetail: `${provinceName}${cityName}${countyName}${detailInfo}`
        };
        // 更新页面收货地址数据
        this.setData({
          address
        });

        // 收货地址本地存储保存一下
        wx.setStorageSync("address", address);
      }
    });
  },

  /**
   * 去结算商品
   */
  goToPay() {
    const { totalCount, address } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: "请选择收获地址",
        mask: true,
        icon: "none",
        duration: 1000
      });
    } else if (totalCount === 0) {
      wx.showToast({
        title: "请选择商品",
        mask: true,
        icon: "none",
        duration: 1000
      });
    } else {
      // 3. 跳转支付页
      wx.navigateTo({
        url: "/pages/pay/pay"
      });
    }
  },

  /**
   * 更新本地存储 更新视图里的价格 数量 总数 商品选择状态等
   */
  updateCart(cartData) {
    // 总价格
    let totalMoney = 0;
    // 商品总数
    let totalCount = 0;
    cartData.forEach(v => {
      // 计算之前判断商品是否选中
      if (v.good_status) {
        // 计算商品价格
        totalMoney += v.good_num * v.goods_price;
        // 计算商品总数
        totalCount++;
      }
    });
    // 更新视图
    this.setData({
      totalMoney,
      totalCount,
      cartData,
      checkAll: totalCount === cartData.length
    });
    // 更新本地存储
    wx.setStorageSync("goodBuy13", cartData);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let storage = wx.getStorageSync("goodBuy13") || {};
    let address = wx.getStorageSync("address") || {};
    this.setData({
      cartData: storage,
      address: address
    });
    this.updateCart(storage);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
