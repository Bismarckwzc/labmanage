const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

//util.js
    function json2Form(json) {
      var str = [];
      for (var p in json) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
      }
      return str.join("&");
    }
// // 时间戳转换为yyyy - MM - dd hh: mm: ss 格式  formatDate()
// //   * inputTime   时间戳
// function formatDate(inputTime) {
//   var date = new Date(inputTime);
//   var y = date.getFullYear();
//   var m = date.getMonth() + 1;
//   m = m < 10 ? ('0' + m) : m;
//   var d = date.getDate();
//   d = d < 10 ? ('0' + d) : d;
//   var h = date.getHours();
//   h = h < 10 ? ('0' + h) : h;
//   var minute = date.getMinutes();
//   var second = date.getSeconds();
//   minute = minute < 10 ? ('0' + minute) : minute;
//   second = second < 10 ? ('0' + second) : second;
//   return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
// };
// function formatNumber(n) {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// /**
//  * 时间戳转化为年 月 日 时 分 秒
//  * number: 传入时间戳
//  * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
// */
// function formatTime(number, format) {

//   var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
//   var returnArr = [];

//   var date = new Date(number * 1000);
//   returnArr.push(date.getFullYear());
//   returnArr.push(formatNumber(date.getMonth() + 1));
//   returnArr.push(formatNumber(date.getDate()));

//   returnArr.push(formatNumber(date.getHours()));
//   returnArr.push(formatNumber(date.getMinutes()));
//   returnArr.push(formatNumber(date.getSeconds()));

//   for (var i in returnArr) {
//     format = format.replace(formateArr[i], returnArr[i]);
//   }
//   return format;
// }
module.exports = {
  json2Form: json2Form,
  // formatDate: formatDate,
  // formatNumber: formatNumber,
  // formatTime: formatTime,
}
 
 
