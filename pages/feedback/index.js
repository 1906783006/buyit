// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    inputValue: '',
    chooseImg: []
  },
  upLoadImgs: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // tab栏点击切换事件
  handleTabsItemChange(e) {
    //1.获取index参数
    let {index} = e.detail;
    // 2.更改tab活跃的item
    let tabs = this.data.tabs;
    tabs.forEach((v,i) => i === index?v.isActive=true:v.isActive=false);
    // 3.修改原来的tabs数据
    this.setData({
      tabs
    })
    
  },

  // 输入文本框输入
  handleTextInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 点击按钮选择图片
  // 点击 “+” 选择图片
  handleChooseImg() {
    // 2 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],
      success: (result) => {

        this.setData({
          chooseImg: [...this.data.chooseImg,...result.tempFilePaths]
        })
        
      }
    });

  },

  // 点击删除要上传的图片
  handleRemoveImg(e) {
    let {index} = e.currentTarget.dataset;
    let chooseImg = this.data.chooseImg;
    chooseImg.splice(index,1);
    this.setData({
      chooseImg
    })
  },
  // 提交反馈问题到后台
  handleFormSubmit() {
    // 1.获取上传图片数组
    let {chooseImg} = this.data;
    // 2.点击提交上传图片
    chooseImg.forEach((v,i) => {
      wx.uploadFile({
        // 图片要上传到哪里
        // https://imgchr.com/i/JHJ1m9
        url: 'https://imgchr.com', 
        // 上传图片的路径
        filePath: v,
        // 上传文件的名称，后台来获取文件
        name: 'file',
        //顺带的文本信息
        formData: {
        },
        success (result){
          console.log(result.data);
          
          
        }
      })
    })
  }
})