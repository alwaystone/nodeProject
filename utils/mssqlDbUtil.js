/**
sqlserver Model
sqlserver查询添加封装，使用最多的还是executeSql，此方法直接使用sql语句，较为灵活

 **/
const mssql = require("mssql");
const conf = require("../config/config.js");
var log4js = require('log4js');

log4js.configure('./config/log4js.json');
var logger = log4js.getLogger();
logger.level = 'debug';

let restoreDefaults = function () {
    conf.sqlserverConfig;
};
const con = new mssql.ConnectionPool(conf.sqlserverConfig);
con.on('error', err => {
    if (err) {
        logger.error(err);
        throw err;
    }
});

con.connect(err => {
    if (err) {
        logger.error(err);
        console.error(err);
    }
});

let querySql = async function (sql, params, callBack) {
    try{
        let ps = new mssql.PreparedStatement(con);
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        logger.info(sql)
        ps.prepare(sql, err => {
            if (err)
                logger.error(err);
            ps.execute(params, (err, recordset) => {
                callBack(err, recordset);
                ps.unprepare(err => {
                    if (err)
                        logger.error(err);
                });
            });
        });
    }catch(err){
        logger.error(err);
        console.error('SQL error', err);
    }
    restoreDefaults();
};


var select = async function (tableName, topNumber, whereSql, params, orderSql, callBack) {
    try{
        var ps = new mssql.PreparedStatement(con);
        var sql = "select * from " + tableName + " ";
        if (topNumber != "") {
            sql = "select top(" + topNumber + ") * from " + tableName + " ";
        }
        sql += whereSql + " ";
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        sql += orderSql;
        console.log(sql);
        logger.info(sql)
        ps.prepare(sql, err => {
            if (err)
            logger.error(err);
            ps.execute(params, (err, recordset) => {
                callBack(err, recordset);
                ps.unprepare(err => {
                    if (err)
                        logger.error(err);
                });
            });
        });
    }catch(err){
        logger.error(err);
        console.error('SQL error', err);
    }
    restoreDefaults();
};

var selectAll = async function (tableName, callBack) {
    try{
        var ps = new mssql.PreparedStatement(con);
        var sql = "select * from " + tableName + " ";
        logger.info(sql)
        ps.prepare(sql, err => {
            if (err)
                logger.error(err);
            ps.execute("", (err, recordset) => {
                callBack(err, recordset);
                ps.unprepare(err => {
                    if (err)
                        logger.error(err);
                });
            });
        });
    }catch(err){
        logger.error(err);
        console.error('SQL error', err);
    }
    restoreDefaults();
};

var add = async function (addObj, tableName, callBack) {
    try{
        var ps = new mssql.PreparedStatement(con);
        var sql = "insert into " + tableName + "(";
        if (addObj != "") {
            for (var index in addObj) {
                if (typeof addObj[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof addObj[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
                sql += index + ",";
            }
            sql = sql.substring(0, sql.length - 1) + ") values(";
            for (var index in addObj) {
                if (typeof addObj[index] == "number") {
                    sql += addObj[index] + ",";
                } else if (typeof addObj[index] == "string") {
                    sql += "'" + addObj[index] + "'" + ",";
                }
            }
        }
        sql = sql.substring(0, sql.length - 1) + ")";
        logger.info(sql)
        ps.prepare(sql, err => {
            if (err)
                logger.error(err);
            ps.execute(addObj, (err, recordset) => {
                callBack(err, recordset);
                ps.unprepare(err => {
                    if (err)
                        logger.error(err);
                });
            });
        });
    }catch(err){
        logger.error(err);
        console.error('SQL error', err);
    }
    restoreDefaults();
};

var update = async function (updateObj, whereObj, tableName, callBack) {
    try{
        var ps = new mssql.PreparedStatement(con);
        var sql = "update " + tableName + " set ";
        if (updateObj != "") {
            for (var index in updateObj) {
                if (typeof updateObj[index] == "number") {
                    ps.input(index, mssql.Int);
                    sql += index + "=" + updateObj[index] + ",";
                } else if (typeof updateObj[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                    sql += index + "=" + "'" + updateObj[index] + "'" + ",";
                }
            }
        }
        sql = sql.substring(0, sql.length - 1) + " where ";
        if (whereObj != "") {
            for (var index in whereObj) {
                if (typeof whereObj[index] == "number") {
                    ps.input(index, mssql.Int);
                    sql += index + "=" + whereObj[index] + " and ";
                } else if (typeof whereObj[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                    sql += index + "=" + "'" + whereObj[index] + "'" + " and ";
                }
            }
        }
        sql = sql.substring(0, sql.length - 5);
        logger.info(sql)
        ps.prepare(sql, err => {
            if (err)
                logger.error(err);
            ps.execute(updateObj, (err, recordset) => {
                callBack(err, recordset);
                ps.unprepare(err => {
                    if (err)
                        logger.error(err);
                });
            });
        });
    }catch(err){
        logger.error(err);
        console.error('SQL error', err);
    }
    restoreDefaults();
};

var del = async function (whereSql, params, tableName, callBack) {
    try{
        var ps = new mssql.PreparedStatement(con);
        var sql = "delete from " + tableName + " ";
        if (params != "") {
            for (var index in params) {
                if (typeof params[index] == "number") {
                    ps.input(index, mssql.Int);
                } else if (typeof params[index] == "string") {
                    ps.input(index, mssql.NVarChar);
                }
            }
        }
        sql += whereSql;
        logger.info(sql)
        ps.prepare(sql, err => {
            if (err)
                logger.error(err);
            ps.execute(params, (err, recordset) => {
                callBack(err, recordset);
                ps.unprepare(err => {
                    if (err)
                        logger.error(err);
                });
            });
        });
    }catch(err){
        logger.error(err);
        console.error('SQL error', err);
    }
    restoreDefaults();
};

var executeSql = async function (sql, callBack) {
    try{
        var ps = new mssql.PreparedStatement(con);
        logger.info(sql)
        ps.prepare(sql, err => {
            if (err)
                logger.error(err);
            ps.execute("", (err, recordset) => {
                callBack(err, recordset);
                ps.unprepare(err => {
                    if (err)
                        logger.error(err);
                });
            });
        });
    }catch(err){
        logger.error(err);
        console.error('SQL error', err);
    }
    restoreDefaults();
};

exports.config = conf;
exports.del = del;
exports.select = select;
exports.update = update;
exports.querySql = querySql;
exports.selectAll = selectAll;
exports.restoreDefaults = restoreDefaults;
exports.add = add;
exports.executeSql = executeSql;