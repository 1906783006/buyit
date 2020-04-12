import {
  login
} from "../../utils/asyncWx"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {
  request
} from "../../request/index"
Page({

  async handleGetUserInfo(e) {
    try {
      // 1.获取用户信息
      const {
        encryptedData,
        iv,
        rawData,
        signature
      } = e.detail;
      // 2.获取小程序登录成功之后的code值
      const {
        code
      } = await login();
      const loginParams = {
        encryptedData,
        iv,
        rawData,
        signature,
        code
      };
      // 3.发送请求，获取用户token值,因为我没有企业支付权限所以获取不了token!!!
      const res = await request({
        url: "/users/wxlogin",
        data: loginParams,
        method: "post"
      })
      console.log(res);
      //4.把token存储到缓存中,同时跳转回上一个页面
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      })
    } catch (error) {
      console.log(error);
    }

  }

})