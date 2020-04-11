import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDtail: {}
  },
  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求对应商品详情数据
    this.getGoodsDetail(options);
  },

  //设置请求商品详情数据函数
  async getGoodsDetail(param) {
    var goodsDtail = await request({
      url: "/goods/detail",
      data: param
    })
    this.goodsInfo = goodsDtail;
    this.setData({
      goodsDtail: {
        pics: goodsDtail.pics,
        goods_price: goodsDtail.goods_price,
        goods_name: goodsDtail.goods_name,
        goods_introduce: goodsDtail.goods_introduce.replace(/\.webp/,'.jpg')
      }
    })
  },

  // 点击预览图片
  handlePreview(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.goodsDtail.pics.map((x)=>x.pics_mid_url)
    })
  },

  // 点击加入购物车
  handleCartAdd() {
    // 1.获取缓存中的购物车商品
    let cart = wx.getStorageSync('cart') || [];
    // 2.查询是否有这一个商品
    let index = cart.findIndex(v => v.goods_id===this.goodsInfo.goods_id);
    // 3.如果不存在则添加这个商品
    if(index === -1) {
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      // 如果不存在则不需要添加商品，添加数量
      cart[index].num++;
    }
    wx.setStorageSync('cart',cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  }
})