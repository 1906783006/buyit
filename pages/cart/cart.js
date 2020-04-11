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
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 1.获取缓存中的地址
    const address = wx.getStorageSync("address");
    // 2.设置地址数据
    this.setData({
      address
    })
    // 1.获取缓存中的购物车商品
    const cart = wx.getStorageSync('cart')||[];
    // 设置全选框的值，如果是空数组调用every这个方法也返回true
    // 1.总价格，总数量
    this.setCart(cart);
    
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
    }
    // 3.如果状态码为true或者undefined则获取用户地址
     const address = await chooseAddress();
     address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
     wx.setStorageSync("address",address);
  },

  // 单个商品选中功能
  handleItemChange(e) {
    let {cart} = this.data;
    // 1.获取这个选中状态改变的商品
    const index = cart.findIndex(v=>v.goods_id === e.currentTarget.dataset.id);
    // 2.把cart里这个商品的选中状态改变
    cart[index].checked = !cart[index].checked;
    // 3.修改全选状态，总价格，总数量
    // 设置全选框的值，如果是空数组调用every这个方法也返回true
    this.setCart(cart);
  },

  // 全选反选功能
  checkedAll(e) {
    let {allChecked,cart} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked = allChecked);
    this.setCart(cart);
    
  },

  // 设置购物车商品，总价格，总数量，全选状态
  setCart(cart) {
    // 设置全选框的值，如果是空数组调用every这个方法也返回true
    let allChecked = true;
    // 1.总价格，总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length?allChecked:false;
    // 2.给地址数据,购物车商品赋值
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    }),
    //3,存入缓存
    wx.setStorageSync("cart", cart);
  },

  // 每个商品数量的编辑
  async handleItemNumEdit(e) {
    
    // 1.获取商品,id,操作符数据
    let {id,operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    // 2.获取当前操作的商品
    const index = cart.findIndex(v=>id===v.goods_id);
    // 1.当商品数量为1还点击减号是则删除当前商品
    if(cart[index].num === 1 && operation === -1) {
      const res = await showModal({content: '您是否要删除此商品'});
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    } else {
      // 3.修改当前商品数量
      cart[index].num += operation;
      // 4.修改状态
      this.setCart(cart);
    }
    
  },

  // 点击支付
  async handlePay(e) {
    let {address,totalNum} = this.data;
    // 1.如果地址为空弹出提醒
    if(!address.userName) {
      await showToast({title: "您还没有选择收货地址"});
      return
    }
    // 2.如果购物车为空弹出提醒
    if(totalNum == 0) {
      await showToast({title: "您还没有选购商品"});
      return 
    }
    // 3.都不为空则跳转支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  }
})