var fs = require('fs');
var join = require('path').join;
// 读取树形结构的示例
var getTreeFiles = function (rootPath){
    function findJsonFile(path){
        let files = fs.readdirSync(path);
        let childFiles = [];
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                childFiles.push({path : fPath, isFile : false, children : findJsonFile(fPath)})
            }
            if (stat.isFile() === true) { 

              childFiles.push({path : fPath, isFile : true})
            }
        });
        return childFiles;
    }
    return {path : rootPath, isFile : false, children : findJsonFile(rootPath)}
}

//读取所有叶子节点的文件路径
function getArrayLeafFiles(rootPath){
    let jsonFiles = [];
    function findArrayLeafFile(path){
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findArrayLeafFile(fPath);
            }
            if (stat.isFile() === true) { 
              jsonFiles.push(fPath);
            }
        });
    }
    findArrayLeafFile(rootPath);
    return jsonFiles;
}

exports.getTreeFiles = getTreeFiles
exports.getArrayLeafFiles = getArrayLeafFiles
