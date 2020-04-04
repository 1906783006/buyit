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