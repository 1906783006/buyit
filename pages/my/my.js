// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })
  }
})