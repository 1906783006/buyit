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
    console.log(goodsDtail);
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
  }
})