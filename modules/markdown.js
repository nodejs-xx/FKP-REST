var marked = require('marked')
var render = require('./common/mdrender')

function *mkmd(md_raw, templet){
    var mdcnt = templet
    marked.setOptions({
        renderer: render,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    return yield marked(md_raw, function (err, data) {
        if (err) {
            console.log(err, 'markdown.js');
            // cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
            return;
        }
        mdcnt.mdcontent.cnt = data

        var re = /<h2[^>]?.*>(.*)<\/h2>/ig;
        var mdMenu='', mdMenuList = data.match(re);
        if(mdMenuList&&mdMenuList.length){
            mdMenuList.map(function(item){
                mdMenu += '<li>'+ re.exec(item)[1]+'</li>\n\r';
                re.lastIndex = 0;
            })
        }
        mdcnt.mdcontent.mdmenu = mdMenu

        return mdcnt

    });
}
module.exports = mkmd