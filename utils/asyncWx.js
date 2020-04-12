export const getSetting = function () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: function (result) {
        resolve(result);
      },
      error: function (err) {
        reject(err);
      }
    })
  })
}

export const openSetting = function () {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: function (result) {
        resolve(result);
      },
      error: function (err) {
        reject(err);
      }
    })
  })
}

export const chooseAddress = function () {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: function (result) {
        resolve(result);
      },
      error: function(err) {
        reject(err);
      }
    })
  })
}


// Promise形式showModel
export const showModal = function ({content}) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
          resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
} 

// Promise形式showToast
export const showToast = function ({title}) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
} 

// Promise形式login
export const login = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
} 