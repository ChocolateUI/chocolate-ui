/*
 * @Description: 
 * @Author: Xue Shiming
 * @Date: 2021-07-18 12:29:46
 * @GitLab: git@192.168.120.68:he_xia/gascard-app.git
 * @LastEditors: Xue Shiming
 * @LastEditTime: 2021-07-18 12:29:47
 */
const clone = (obj: any) => {
  if (!obj || typeof obj !== 'object') {
    return
  }
  var newObj: any = obj.constructor === Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        if (key !== 'parent') {
          newObj[key] = clone(obj[key])
        }
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  return newObj
}

export default clone;