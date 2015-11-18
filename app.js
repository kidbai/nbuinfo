var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/NodeJS');

db.on('error', function(error){
    console.log(error);
})

var mongooseSchema = new mongoose.Schema({
    username: {type: String, default: '匿名用户'},
    title   : {type : String},
    content : {type : String},
    time    : {type : Date, default: Date.now},
    age     : {type : Number}
})

// 添加 mongoose 实例方法
mongooseSchema.methods.findbyusername = function(username, callback) {
    return this.model('mongoose').find({username: username}, callback);
}

// 添加 mongoose 静态方法，静态方法在Model层就能使用
mongooseSchema.statics.findbytitle = function(title, callback) {
    return this.model('mongoose').find({title: title}, callback);
}

// model
var mongooseModel = db.model('mongoose', mongooseSchema);

// 增加记录 基于 entity 操作
// var doc = {username : 'emtity_demo_username', title : 'emtity_demo_title', content : 'emtity_demo_content'};
// var mongooseEntity = new mongooseModel(doc);
// mongooseEntity.save(function(error) {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('saved OK!');
//     }
//     // 关闭数据库链接
//     db.close();
// });

// 增加记录 基于model操作
// var doc = {username : 'yangbai', title : '66666', content : 'I am handsome', age: 20};
// mongooseModel.create(doc, function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('save ok');
//     }
//     // 关闭数据库链接
//     db.close();
// });


// 修改记录
// mongooseModel.update(conditions, update, options, callback);
var conditions = {username : 'model_demo_username'};
var update     = {$set : {age : 27, title : 'model_demo_title_update'}};
var options    = {};
mongooseModel.update(conditions, update, options, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('update ok!');
    }
    //关闭数据库链接
    db.close();
});