import {getSetting,openSetting,chooseAddress} from "../../utils/asyncWx"
import regeneratorRuntime from "../../lib/runtime/runtime";

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击获取地址
  /* handleGetAdd() {
    // 1.获取权限状态码
    wx.getSetting({
      success: function(result) {
        const scopeAddress = result.authSetting["scope.address"];
        // 2.如果状态码为true或者undefined则获取用户地址
        if(scopeAddress===true || scopeAddress===undefined) {
          wx.chooseAddress({
            success: function(result1) {
              console.log(result1);
              
            }
          })
        } else {
          // 3.如果状态码为false则诱导用户转到权限页面
          wx.openSetting({
            success: function(result2) {
              // 4.可以调用 收获地址代码
              wx.chooseAddress({
                success: function(result3) {
                  console.log(result3);
                  
                }
              })
              
            }
          })
        }
      }
    })
    // 1.使用小程序获取地址权限API
    wx.chooseAddress({
      success: function(ret) {
        console.log(ret);
        // 2.判断权限状态码
        wx.getSetting({
          success: function(res) {
            
          }
        })
      }
    })
  } */

  // 点击获取地址
  async handleGetAdd() {
  // 1.获取状态信息
    const ret1 = await getSetting();
    const scopeAddress = ret1.authSetting["scope.address"];
  // 2.如果状态码为false则诱导用户转到权限页面
    if(scopeAddress ===false) {
      await openSetting();
      const ret2 = await chooseAddress();
    } else {
    // 2.如果状态码为true或者undefined则获取用户地址
     const ret2 = await chooseAddress();
     console.log(ret2);
     
    }
  }
})