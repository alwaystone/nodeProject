//mysql数据源配置项
let mysqlConfig = {
  connectionLimit : 10,
  host : 'localhost',
  user : 'root',
  password : 'admin',
  database  : 'ways'
};
//sqlserver数据源配置项
let sqlserverConfig = {
  user: 'ways',
  password: 'admin',
  server: 'localhost',
  database: 'demo',
  port: 1433,
  options: {
   encrypt: true // Use this if you're on Windows Azure
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 3000
  }
};
//http请求基础路径
const baseUrl = '';

module.exports.mysqlConfig = mysqlConfig;
module.exports.sqlserverConfig = sqlserverConfig;
module.exports.baseUrl = baseUrl;
