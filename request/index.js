// 同时发送异步代码的次数
let ajaxIimes = 0;
export const request = (params) => {
  ajaxIimes++;
  wx.showLoading({title: '加载中',mask: true})

  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl+params.url,
      success: (res) => {
        resolve(res.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxIimes--;
        if(ajaxIimes == 0) {
          wx.hideLoading()
        }
      }
    })
  })
}