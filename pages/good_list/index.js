import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
// pages/good_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      }, 
      {
        id: 1,
        value: "销量",
        isActive: false
      }, 
      {
        id: 2,
        value: "价格",
        isActive: false
      }, 
    ],
    goodsList: []
  },
    
    // 接口要的参数
    QueryParams: {
      query: "",
      cid: "",
      pagenum: 1,
      pagesize: 10
    },
    // 总的页码
    totalPages: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList()
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url:"/goods/search",
      data: this.QueryParams
    });

    console.log(res);
    // 设置总页码
    this.totalPages = Math.ceil(res.total / this.QueryParams.pagesize);
    // 设置数据
    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    })
  },

  // 标题点击事件，这个事件是从子组件传进来的
  handleTabsItemChange(e) {
    
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => {
      i === index?v.isActive = true:v.isActive = false;
    })
    this.setData({
      tabs
    })
  },

  // 页面触底加载新数据
  onReachBottom() {
    if(this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({title:'没有下一页数据了'});
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  //监听用户上拉刷新事件
  onPullDownRefresh() {
    // 1.重置商品数据
    this.setData({
      goodsList: []
    })
    // 2.重新设置请求参数页码为1
    this.QueryParams.pagenum = 1;
    // 3.重新请求数据
    this.getGoodsList();
    // 4.请求完成后关闭下拉刷新窗口
    wx.stopPullDownRefresh();
  }
})