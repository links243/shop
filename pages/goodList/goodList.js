import { myRequest } from "../../utils/myRequest";
Page({
  // 请求商品搜索数据
  getGoodsList(obj) {
    const { query, cid, pagesize, pagenum } = this.data;
    myRequest({
      url: "goods/search",
      data: {
        ...obj,
        query,
        cid,
        pagesize
      }
    }).then(res => {
      console.log(res);
      this.setData({
        goods: [...this.data.goods, ...res.goods],
        total: res.total
      });
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    cid: "",
    query: "",
    pagenum: 1,
    goods: [],
    pagesize: 10,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    const { cid, query } = options;
    this.setData({
      cid,
      query
    });
    const { pagenum } = this.data;
    // 发请请求
    this.getGoodsList({
      pagenum
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let { total, pagesize, pagenum } = this.data;

    if (pagenum < Math.ceil(total / pagesize)) {
      // 页码加1
      this.setData({
        pagenum: ++pagenum
      });
      // 再次请求数据
      this.getGoodsList({
        pagenum
      });
    } else {
      // 弹出提示框
      wx.showToast({
        title: "已经到底了"
      });
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    this.setData({
      // 商品列表重置
      goods: [],
      // 页码需要重置
      pagenum: 1
    });

    // 请求列表数据
    this.getGoodsList({
      // 传递 cid，请求的时候需要根据 cid 查询数据，注意这里的名字不能改
      pagenum: 1
    });
  }
});
