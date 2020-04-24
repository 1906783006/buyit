import { request } from "../../request/index";
import regeneratorRuntime from "../../lib/runtime/runtime";

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDtail: {},
    isCollect: false
  },
  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    // 请求对应商品详情数据
    let page = getCurrentPages();
    let currentPage = page[page.length-1];
    let options = currentPage.options;
    const goods_id = options.goods_id;
  
    this.getGoodsDetail(goods_id); 

    //判断是否被收藏
    const collect = wx.getStorageSync('collect');
    this.setData({
      isCollect: collect.some((v,i) => v.goods_id == goods_id)
    })

  },

  //设置请求商品详情数据函数
  async getGoodsDetail(goods_id) {
    var goodsDtail = await request({
      url: "/goods/detail",
      data: {goods_id}
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
  },

  // 点击收藏商品
  handleCollect(){
    let isCollect=false;
    // 1 获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    // 2 判断该商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    // 3 当index！=-1表示 已经收藏过 
    if(index!==-1){
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
        
    }else{
      // 没有收藏过
      collect.push(this.goodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isCollect
    })
      
      
  }
})