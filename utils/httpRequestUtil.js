//模拟发送http请求
var request = require("request");
var conf = require('../config/config.js')
var log4js = require('log4js');

var baseUrl = conf.baseUrl;

log4js.configure('./config/log4js.json');
var logger = log4js.getLogger();
logger.level = 'debug';
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
        logger.info(requestUrl);
        return resolve(body);
      } else {
        logger.error({url:requestUrl,err:err});
        return reject(err);
      }
    });
  })
}

exports.httpRequest = httpRequest
