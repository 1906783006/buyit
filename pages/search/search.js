import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    searchList: [],
    showCancle: false
  },

  TimeId: -1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 输入框搜索
  handleInput(e) {
    let {value} = e.detail;

    // 检查输入是否合法,如果不合法返回
    if(!value.trim()) return;

    //显示取消按钮
    this.setData({
      showCancle: true
    })
    
    // 防抖操作
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.getSearchList(value);
    }, 1000);
    
  },

  //搜索请求商品数据
  async getSearchList(value) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query: value
      }
    })
    this.setData({
      searchList:res
    })
  },

  // 点击取消搜索
  handleCancel(e) {
    this.setData({
      inputValue: '',
      searchList: [],
      showCancle: false
    })
  }
})