// pages/category/category.js
import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    // 右侧内容滚动条距离顶部的距离
    scrollTop: 0
  },

  cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates();
    } else {
      // 有旧数据，定义一个过期时间：10s
      if (Date.now() - Cates.time > 1000 * 1000) {
        this.getCates();
      } else {
        this.cates = Cates.data;
        let leftMenuList = this.cates.map(item => item.cat_name);
        let rightContent = this.cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }

    }
  },

  //获取分类数据
  async getCates() {
    // request({
    //   url: "/categories"
    // }).then(res => {
    //   this.cates = res.data.message;
    //   // 把接口数据缓存到本地存储
    //   wx.setStorageSync("cates", {time:Date.now(),data:this.cates});

    //   let leftMenuList = this.cates.map(item => item.cat_name);
    //   let rightContent = this.cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    // 使用es7语法来请求数据
    const res = await request({url:"/categories"});
    this.cates = res;
      // 把接口数据缓存到本地存储
      wx.setStorageSync("cates", {time:Date.now(),data:this.cates});

      let leftMenuList = this.cates.map(item => item.cat_name);
      let rightContent = this.cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },

  // 左侧菜单的点击事件
  handleItemTap(e) {
    let index = e.currentTarget.dataset.index;
    let rightContent = this.cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
    // 重新设置右侧内容的scroll-view距离顶部的距离
      scrollTop: 0
    })

    
  }
})