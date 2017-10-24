var path = require('path');
var fs = require('fs');
var through = require('through2');

function toBase64(options) {
    var opts = options || {};
    var rule = opts.rule || /url\([^\)]+\)/g;
    var initFileType = opts.fileType || 'css';
    var baseDir = opts.baseDir || '.';

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        var content = file.contents.toString();
        var images = content.match(rule);
        // var currentPath = __dirname + '../../../' + baseDir;
        var currentPath = path.dirname(file.path);// Jim修改于20171023：原方法在部分PC报路径错误，新方法参考gulp-base64
        images.forEach(function(item,index) {
            imageURL = item.replace(/\(|\)|\'/g, '');
            imageURL = imageURL.replace(/^url/g, '');
            var route = path.join(currentPath, imageURL);
            var filepath = fs.realpathSync(route);
            var extname = path.extname(imageURL).slice(1);
            var imageContent = new Buffer(fs.readFileSync(filepath)).toString('base64');
            if(opts.debug){// Jim修改于20171023：添加面向用户的debug
                console.log('图片'+index+':'+item,'转后='+(imageContent.length/1024).toFixed(2)+'kb','转码:',(imageContent.length<opts.maxImageSize?'√':'×'));
            }
            if(imageContent.length<opts.maxImageSize){// Jim修改于20171023：判断图片小于maxImageSize的才转base64
                if (initFileType === 'css') {
                    content = content.replace(item, 'url(\'data:image/' + extname.toLowerCase() + ';base64,' + imageContent + '\')');
                }
                else {
                    content = content.replace(item, 'data:image/' + extname.toLowerCase() + ';base64,' + imageContent);
                }                
            }
        });

        file.contents = new Buffer(content);
        this.push(file);

        cb();
    })
}

module.exports = toBase64;