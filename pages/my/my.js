// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNums: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const userInfo = wx.getStorageSync("userInfo");

    // 获取收藏的商品
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      userInfo,
      collectNums: collect.length
    })

  }
})