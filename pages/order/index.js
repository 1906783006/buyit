import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
    orders: []
  },

  onShow: function () {
    // 1.获取当前页面栈-数组，最大长度是10
    let pages = getCurrentPages();
    //2.数组中，索引最大的就是当前页面
    let currentPage = pages[pages.length-1];
    //3.获取页面参数type
    let {type} = currentPage.options;
    // 4.根据参数选中tabs的item
    this.changeItem(type-1);
    // 5.发送响应请求
    this.getOrders(type);
    
  },

  // 请求订单函数
  async getOrders(type) {
    const res = await request({
      url: "/my/orders/all",
      data: {type}
    })
    if(!res) return;
    this.setData({
      orders: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  // 点击Item的相关操作
  handleTabsItemChange(e) {
    // 1.获取组件传过来的参数
    let {index} = e.detail;
    // 2.改变选中样式
    this.changeItem(index);
    // 2.请求相应的订单
    this.getOrders(index+1);
  },
  // 改变选中样式函数
  changeItem(index) {
    // 2.获取组件数据
    let {tabs} = this.data;
    // 3.修改数据
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    // 4.改变原来数据
    this.setData({
      tabs
    })
  }
})