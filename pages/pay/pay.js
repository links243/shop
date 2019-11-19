// pages/pay/pay.js
import regeneratorRuntime from "../../lib/runtime/runtime.js";
import { myRequest } from "../../utils/myRequest";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    totalMoney: 0,
    totalCount: 0,
    cartData: [],
    address: {},
    token: ""
  },

  /**
   * 获取用户信息并注册
   */
  getToken(e) {
    const { encryptedData, rawData, iv, signature } = e.detail;
    wx.login({
      success: res => {
        const { code } = res;
        myRequest({
          url: "users/wxlogin",
          method: "POST",
          data: {
            encryptedData,
            rawData,
            iv,
            signature,
            code
          }
        }).then(res => {
          if (res === null) {
            wx.showToast({
              title: "登录失败，请重试",
              mask: true,
              duration: "1000"
            });
          } else {
            const { token } = res;
            this.setData({
              token
            });
            wx.setStorageSync("goodBuy37_Token", token);
            wx.setStorageSync("goodBuy37_RawData", JSON.parse(rawData));
          }
        });
      }
    });
  },

  /**
   * 支付订单
   */
  async payHandle() {
    const { cartData, address, totalMoney } = this.data;
    let goods = [];

    console.log(cartData);
    cartData.forEach(v => {
      if (v.good_status) {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.good_num,
          goods_price: v.goods_price
        });
      }
    });

    try {
      // 支付流程 ——创建订单——准备预支付(获取订单参数)——发起微信支付——查询支付是否成功——删除购物车商品
      // 支付流程1 - 创建订单
      const { order_number } = await myRequest({
        url: "my/orders/create",
        method: "post",
        data: {
          order_price: totalMoney,
          consignee_addr: address.addressDetail,
          goods
        }
      });

      // 支付流程2 - 准备预支付(获取订单参数)
      const { pay } = await myRequest({
        url: "my/orders/req_unifiedorder",
        method: "post",
        data: {
          order_number
        }
      });
      console.log("支付流程2 预付订单", pay);

      // // 支付流程3 - 发起微信支付
      // const res = await new Promise((resolve,reject) => {
      //   wx.requestPayment({
      //     ...pay,
      //     success (res) { 
      //       resolve(res);
      //     },
      //     fail (err) { 
      //       reject(err);
      //     }
      //   })
      // });

      // 支付流程4 - 查询支付结果
      const res2 = await myRequest({
        url: 'my/orders/chkOrder',
        method: "post",
        data: {
          order_number
        }
      });
      console.log("支付流程4 查询支付结果",res2);

      // 5. 支付后，把商品从购物车中删除
      // 1. 过滤出来没有选中的商品
      const newCart = cartData.filter(v => !v.goods_checked);
      // 2. 把没有选中的商品保存到本地
      wx.setStorageSync('goodBuy13', newCart);


      // 6. 跳转到订单页面
      wx.navigateTo({
        url: '/pages/orders/orders?type=3',
      });

    } catch (err) {
      console.log(err);
    }
    console.log(goods);
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
    const cartData = wx.getStorageSync("goodBuy13") || [];
    const token = wx.getStorageSync("goodBuy13_token") || [];
    const address = wx.getStorageSync("address") || {};
    this.setData({
      address,
      token
    });
    this.updateCart(cartData);
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
