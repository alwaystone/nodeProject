/* 
这个工具类在使用之后需要手动关闭连接
*/
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var log4js = require('log4js');

log4js.configure('./config/log4js.json');
var logger = log4js.getLogger();
logger.level = 'debug';

var DB = DB || {};
DB.SqliteDB = function(file){
    DB.db = new sqlite3.Database(file);
 
    DB.exist = fs.existsSync(file);
    if(!DB.exist){
        logger.info("Creating db file!");
        fs.openSync(file, 'w');
    };
};
 
DB.printErrorInfo = function(err){
    logger.error("Error Message:" + err.message);
};
 
DB.SqliteDB.prototype.createTable = function(sql){
    DB.db.serialize(function(){
        DB.db.run(sql, function(err){
            logger.info(sql)
            if(null != err){
                DB.printErrorInfo(err);
                return;
            }else{
                logger.error("Error Message:" + err.message);
            }
        });
    });
};
 
/// tilesData format; [[level, column, row, content], [level, column, row, content]]
DB.SqliteDB.prototype.insertData = function(sql, objects){
    DB.db.serialize(function(){
        logger.info(sql)
        var stmt = DB.db.prepare(sql);
        for(var i = 0; i < objects.length; ++i){
            stmt.run(objects[i]);
        }
        stmt.finalize();
    });
};
 
DB.SqliteDB.prototype.queryData = function(sql, callback){
    DB.db.all(sql, function(err, rows){
        if(null != err){
            DB.printErrorInfo(err);
            return;
        }else{
            logger.error(sql+"Error Message:" + err.message);
        }
        /// deal query data.
        if(callback){
            callback(rows);
        }
    });
};
 
DB.SqliteDB.prototype.executeSql = function(sql){
    DB.db.run(sql, function(err){
        if(null != err){
            DB.printErrorInfo(err);
        }else{
            logger.error(sql+"Error Message:" + err.message);
        }
    });
};
 
DB.SqliteDB.prototype.close = function(){
    DB.db.close();
};
 
/// export SqliteDB.
exports.SqliteDB = DB.SqliteDB;