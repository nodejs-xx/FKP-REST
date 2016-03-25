// var libs = require('../../../libs/libs')
var errors = include('libs/errors')
var libs = include('libs/libs');
const mongoose = require("mongoose");
var errors = libs.errors;

function *detailTopic(oridata) {
    libs.clog('文章详情/'+__filename)
    var location = this.local;


    var method = this.method;
    if (method === 'NODE'){

        //处理get数据
        if (location.query.topic){
            return yield getDtail.call(this, location.query.topic)
        }

        //处理post数据
        else{
            var body = yield libs.$parse(this);
            if (body && body.topic){
                return yield getDtail.call(this, body.topic)
            }
        }
    }

    if (method === 'GET') {
        if (location.query.topic){
            return yield getDtail.call(this, location.query.topic)
        }
    }

    if (method === 'POST') {
        var ttt = false;
        var body = yield libs.$parse(this);
        if (body) {
            if (body.topic) {
                ttt = body.topic;
            }
        }
        return yield getDtail(ttt)
    }

    function *getDtail(ttt){
        if (!ttt){
            return errors['20001']
        }
        try {
            var Topic = mongoose.model('Topic')
            var topics = yield Topic.topicMatchesId(ttt);
            if (topics.error){
                this.redirect = '/404'
            }
            else{
                return [topics];
            }

        } catch (err) {
            return err;
        }
    }
}

module.exports = {
    getData : detailTopic
}
