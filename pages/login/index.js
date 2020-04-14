// pages/login/index.js
Page({
  // 获取用户信息
  handleGetUserInfo(e) {
    const {userInfo} = e.detail;
    wx.setStorageSync("userInfo",userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
  
})