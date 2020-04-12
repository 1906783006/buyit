/**
 * 1,页面加载的时候要做的事
      1.从缓存中获取购物车数据渲染到页面（筛选出checked属性为true的商品）
  2.微信支付
    1.哪些账号可以实现微信支付
      1.企业账号 
      2.企业账号的小程序后台中必须给开发者添加上白名单
        1.一个appid可以同时绑定多个开发者
        2.这些开发者就可以公用这些appid和它的开发权限了
  3.支付按钮
    1.先判断缓存中有没有token
    2.如果没有，跳到授权页面，进行获取token
    3.有，进行下一步
 */


import {getSetting,openSetting,chooseAddress,showModal,showToast} from "../../utils/asyncWx"
import regeneratorRuntime from "../../lib/runtime/runtime";

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 1.获取缓存中的地址
    const address = wx.getStorageSync("address");
    // 1.获取缓存中的购物车商品
    let cart = wx.getStorageSync('cart')||[];
    // 过滤后的购物车商品
    cart = cart.filter(v => v.checked);
    // 设置全选框的值，如果是空数组调用every这个方法也返回true

    // 1.总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });

    // 2.给地址数据,购物车商品赋值
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
  },

  // 点击结算
  handleOrderPay() {
    // 1.判断缓存中有没有token
    const token = wx.getStorageSync("token")
    // 2.判断
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    console.log('已经存在token');
    
  }
})