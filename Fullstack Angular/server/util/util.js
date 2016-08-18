var config = require("../config/config");
var configuration = config.configuration();
var mongoDB = configuration.mongoDB;
var MongoClient = require('mongodb').MongoClient;


module.exports.mongoConnect =
    function connect(dbCollection, callBackFunction) {
        MongoClient.connect(mongoDB, function (err, db) {
            if (err) {
                callBackFunction(err, null);
            }
            var collection = db.collection(dbCollection);
            callBackFunction(null, collection);
        })
}

module.exports.test = function (value) {
    console.log(value);
}

module.exports.treatError = function (err, res) {
    console.log(error);
    if(res) res.send(500, err);
}