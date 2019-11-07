var express = require('express');
var router = express.Router();
const services = require('../services.js');

//获取当前位置信息
router.post('/api/getCurPosition',services.getCurPosition);
//获取当前位置天气信息
router.post('/api/getCurWeather',services.getCurWeather);
//首页列表展示商家
router.post('/api/getIndexListData',services.getIndexListData);
//获取全部的商家数量
router.post('/api/getTotalShop',services.getTotalShop);

module.exports = router;
