var express = require('express');
var api = express.Router();
const lib = require('../../lib');


/**
 * @description wgs84 轉成 金門的twd97
 * @method GET /wgs84totwd97?lat=xx.xx&lng=xx.xx
 */
 api.get('/wgs84totwd97', 
 (req, res, next) => {
   if (!req.query.hasOwnProperty('lat') || !req.query.hasOwnProperty('lng')) return res.status(400).json({code: 400, message: `?lat=xx.xxx&lng=oo.oo`})
   next();
 },
(req, res) => {
 const result = lib.Proj4js.WGS84ToTwd97(parseFloat(req.query.lng), parseFloat(req.query.lat));
 return res.status(200).json({x: result.x, y: result.y});
});


/**
 * @description 金門的twd97 轉成 wgs84
 * @method GET /twd97towgs84?x=xxx&y=ooo
 */
 api.get('/twd97towgs84', 
 (req, res, next) => {
   if (!req.query.hasOwnProperty('x') || !req.query.hasOwnProperty('y')) return res.status(400).json({code: 400, message: `?x=xx.xxx&y=oo.oo`})
   next();
 },
(req, res) => {
 return res.status(200).json(lib.Proj4js.Twd97ToWGS84(parseFloat(req.query.x), parseFloat(req.query.y)));
});

module.exports = api;