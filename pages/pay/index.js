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
    3.有，创建订单 获取到订单编号
    4.已经完成微信支付
    5.手动删除缓存中已经被选中的商品
    6.删除后的购物车数据填充回缓存，跳转页面
 */


import {requestPayment,showToast} from "../../utils/asyncWx"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {request} from "../../request/index"

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
  async handleOrderPay() {
    try {
      // 1.判断缓存中有没有token
      const token = wx.getStorageSync("token")
      // 2.判断
      if(!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }
      // 3.创建订单
      // 3.1 准备创建订单要的请求参数
      const header = {Authorization: token};
      // 3.2 准备请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        })
      })
      const orderParams = {order_price,consignee_addr,goods};
      // 4.准备发送请求，获取订单编号
      const {order_number} = await request({
        url: "/my/orders/create",
        method: "post",
        data: orderParams,
        header
      })
      // 5.发起预支付接口
      const {pay} = await request({
        url: "/my/orders/req_unifiedorder",
        method: "post",
        header,
        data: {
          order_number
        }
      })
      // 6.发起微信支付
      await requestPayment(pay);
      // 7.查询后台 订单状态
      const res = await request({
        url: "/my/orders/chkOrder",
        method: "post",
        header,
        data: {
          order_number
        }
      })

      showToast({title:'支付成功'})
      // 8.删除缓存中已经支付了的商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v=>!v.checked);
      wx.getStorageSync("cart",newCart);
      // 9,支付成功条转到订单页面
      wx.navigateTo({
        url: "/pages/order/index"
      })
    } catch (error) {
      showToast({title:'支付失败'})
      console.log(error);
      
    }

  }


})