var express = require('express');
var router = express.Router();
var GbData = require("../model/referenceData");
var util = require("../util/util");
var ObjectId = require('mongodb').ObjectID;
var data = new GbData(util, ObjectId);


router.route('/api/data')
    .get(function (req, res, next) {
        data.getData(function (err, docs) {
            if (err) {
                util.errorLog(err, res);
            } else {
                res.json(docs);
            }
        });
    })
    .post(function (req, res, next) {
        var doc = req.body;
        data.postData(doc, function (err, docs) {
            if (err) {
                util.errorLog(err, res);
            } else {
                res.status(200).json(doc);
            }
        });
    }).put(function (req, res, next) {
        var doc = req.body;
        data.putData(doc, function (err, doc) {
            if (err) {
                util.errorLog(err, res);
            } else {
                res.json(doc);
            }
        });
    });

router.route('/api/data/:_id')
    .get(function (req, res, next) {
        var _id = req.params._id;
        data.getSingleData(_id, function (err, doc) {
            if (err) {
                util.errorLog(err, res);
            } else {
                res.json(doc);
            }
        });
    })
    .delete(function (req, res, next) {
        var doc = {_id: req.params._id};
        data.removeData(doc, function (err, doc) {
            if (err) {
                util.errorLog(err, res);
            } else {
                res.json(doc);
            }
        });
    });
module.exports.router = router;