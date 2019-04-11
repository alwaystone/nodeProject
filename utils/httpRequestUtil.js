//模拟发送http请求
var request = require("request");
var conf = require('../config/config.js')
var baseUrl = conf.baseUrl;

var httpRequest = function(url, methodType, paramStr, data) {
  return new Promise(function(resolve, reject) {
    var requestUrl = baseUrl + url;
    if (paramStr && paramStr !== '') {
      requestUrl = requestUrl + '?' + paramStr;
    }
    return request({
      url: requestUrl,
      method: methodType,//如果是post就涉及到跨域的问题了
      json: true,
      headers: {
        'content-type': 'application/json',
      },
      body: data
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        return resolve(body);
      } else {
        return reject(err);
      }
    });
  })
}

exports.httpRequest = httpRequest
