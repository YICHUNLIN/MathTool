var express = require('express');
var api = express.Router();
const MArea = require('../../lib/math')


const checkPoints = field => (req, res, next) => {
    if (!req.body.hasOwnProperty(field)) return res.status(400).json({code: 400, message: `${field} field must be required in body.`})
    if (!Array.isArray(req.body[field])) return res.status(400).json({code: 400, message: `${field} field must be an array of point`});
    const error = [];
    req.body[field].forEach((v, i) => {
        if (!v.hasOwnProperty('x') || !v.hasOwnProperty('y')) error.push({index: i, message: 'x and y not be found in point property'});
        else if (!(typeof v.x == 'number') || !(typeof v.y == 'number') ) error.push({index: i, message: 'x and y muse be a number'});
    })
    if (error.length > 0) return res.status(400).json({code: 400, error})
    return next();
} 

/**
 * @description 行列式 determinant, 提供一個以點組成的資料集，必須有順序性
 * @method POST
 */
api.post('/det', checkPoints('data'), (req, res) => {
    const ma = new MArea()
    return res.status(200).json({code: 200, result: ma.det(req.body.data)})
})

/**
 * @descripton 積分模式, 提供兩個集合(兩條 poly line)， 必須從左到右的點
 */
api.post('/integral', checkPoints('data1'), checkPoints('data2'), (req, res) => {
    const ma = new MArea()
    return res.status(200).json({code: 200, result: ma.integral(req.body.data1, req.body.data2)})
})

module.exports = api;