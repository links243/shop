const baseUrl = "https://api.zbztb.cn/api/public/v1/";

export const myRequest = pramas => {
  // v2.0 如果有 header 就直接使用，没有就赋值空对象
  pramas.header = pramas.header || {};
  // 如果请求url包含"my/" 说明是有关用户支付的连接 需要带上token
  if (pramas.url.includes("my/") === true) {
    pramas.header.Authorization = wx.getStorageSync("goodBuy37_Token");
  }

  wx.showLoading({
    title: "加载中",
    mask: true
  });
  return new Promise((resolve, reject) => {
    wx.request({
      ...pramas,
      url: baseUrl + pramas.url,
      success: res => {
        // 请求成功
        // this.setData({
        //   category: res.data.message,
        //   rightDate: res.data.message[0].children,
        //   rightTop: 0,
        //   activeIndex: 0
        // })
        resolve(res.data.message);
      },
      // 请求失败的回调函数
      fail: err => {
        // console.log('请求失败的业务逻辑', err);
        reject(err);
      },
      complete: res => {
        // 不管请求是否成功都执行
        wx.stopPullDownRefresh();
        wx.hideLoading();
      }
    });
  });
};
