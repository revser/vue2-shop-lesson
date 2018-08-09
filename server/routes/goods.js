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
// router.get('/', function(req, res, next) {
//   Goods.find(
//     {},//条件查询
//     {
//       '_id':0,
//       'productId': 1,
//       'productName': 1,
//       'salePrice': 1,
//       'productImage': 1,
//
//     },//字段选择
//     function(err, doc){
//       if(err){
//         res.json({
//           status: '1',
//           msg: err.message
//         })
//       }else {
//         res.json({
//           status: '0',
//           msg:'',
//           result:{
//             count: doc.length,
//             list: doc
//           }
//         })
//       }
//     });
// });
router.get('/', function(req, res, next) {
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  let sort = req.param('sort');
  let skip = (page-1)*pageSize;
  let params = {};
  //skip(), limilt(), sort()三个放在一起执行的时候，执行的顺序是先 sort(), 然后是 skip()，最后是显示的 limit()。
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice': sort});
  goodsModel.exec(function(err, doc) {
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
