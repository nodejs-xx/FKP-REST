var url = require('url');
var path = require('path')
var domain = require('domain');
var extend = require('extend');
var parse = require('co-body');
var lodash = require('lodash');
var qs = require('querystring');


//libs
var getObjType = function(object){
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

var clone = function(target){
    var t = getObjType(target);
    return t === 'Object' ? extend(true, {}, target) : t === 'Array' ? extend(true, [], target) : target;
}

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

var clog = function(msg){
    console.log('====================='+msg);
    console.log('-');
    console.log('-');
    console.log('-');
}

var elog = function(msg){
    console.log('============'+msg);
}

var wlog = function(msg){
    console.log('+++++++++++');
    console.log('+++++++++++');
    console.log(msg);
}

var parseQuery = function(uri){
    var q = url.parse(uri);
    return qs.parse(q.query);
}

var guid = function(prefix) {
    prefix = prefix || "web-";
    return (prefix + Math.random() + Math.random()).replace(/0\./g, "");
}

module.exports = {
    getObjType: getObjType,
    clone: clone,
    clog: clog,
    elog: elog,
    wlog: wlog,
    uri: parseQuery,
    guid: guid,
    $extend: extend,
    $url: url,
    $path: path,
    $domain: domain,
    $parse: parse,
    $lodash: lodash,
    getClientIp: getClientIp,
    errors: require('./errors')
}
