var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require("./../models/goods");
//连接数据库

mongoose.connect('mongodb://127.0.0.1:27017/vue_shop_lesson');


mongoose.connection.on('connected', function() {
  console.log("MongoDB connected success!");
});
mongoose.connection.on("error", function(){
  console.log("MongoDB connected fail!");
});
mongoose.connection.on("disconnected", function(){
  console.log("MongoDB disconnected!");
});

/* 查询商品列表数据 使用Goods */
router.get('/', function(req, res, next) {
  Goods.find(
    {},//条件查询
    {
      '_id':0,
      'productId': 1,
      'productName': 1,
      'salePrice': 1,
      'productImage': 1,

    },//字段选择
    function(err, doc){
      if(err){
        res.json({
          status: '1',
          msg: err.message
        })
      }else {
        res.json({
          status: '0',
          msg:'',
          result:{
            count: doc.length,
            list: doc
          }
        })
      }
    });
});


module.exports = router;
