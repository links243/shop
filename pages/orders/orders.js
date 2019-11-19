import { myRequest } from '../../utils/myRequest';
// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 活跃状态的 type
    activeType: 1,
    // 订单列表
    orders:[],
    // 用于 tabs 的数据
    tabs:[
      {
        type: 1,
        text: '全部'
      },
      {
        type: 2,
        text: '待付款'
      },
      {
        type: 3,
        text: '代发货'
      },
      {
        type: 4,
        text: '退款/退货'
      },
    ]
  },
  // 点击切换
  changeTabs(e){
    // 获取 type 值
    const { type } = e.currentTarget.dataset;
    // 更新视图
    this.setData({
      activeType: type
    });
    // console.log(e);

    this.getOrderData();
  },

  getOrderData(){
    const { activeType } = this.data;
    myRequest({
      url:'my/orders/all',
      data:{
        type: activeType
      }
    }).then(res=>{
      // console.log(res);
      const { orders } = res;
      this.setData({
        // ...v 先把原有的保留，再额外添加一个格式化的时间
        // map 内部返回 对象，需要 () 包起来
        orders: orders.map(v => ({ ...v, format_time: new Date(v.create_time * 1000).toLocaleString() }))
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options;
    this.setData({
      activeType: +type
    });
    this.getOrderData();
  },

})