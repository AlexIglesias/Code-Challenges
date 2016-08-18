module.exports = function Data(util, ObjectId) {
    var collectionName = "GBdata";

    function getData(cb) {
        util.mongoConnect(collectionName, function (err, collection) {
            collection.find().toArray(cb);
        })
    }

    function postData(doc, cb) {
        util.mongoConnect(collectionName, function (err, collection) {
            collection.insert(doc, cb);
        })
    }

    function getSingleData(_id, cb) {
        var q = {
            _id: new ObjectId(_id)
        };
        util.mongoConnect(collectionName, function (err, collection) {
            collection.findOne(q, cb);
        })
    }

    function putData(doc, cb) {
        util.mongoConnect(collectionName, function (err, collection) {
            getSingleData(doc._id, function (err, docDB) {
                docDB.address = doc.address;
                docDB.variables.population = doc.variables.population;
                docDB.variables.is_reference = doc.variables.is_reference;
                docDB.variables.indexes.population = doc.variables.indexes.population;
                docDB.variables.indexes.unemployment = doc.variables.indexes.unemployment;
                docDB.variables.indexes.commercial_activity = doc.variables.indexes.commercial_activity;
                docDB.variables.indexes.wealth = doc.variables.indexes.wealth;
                docDB.variables.indexes.traffic = doc.variables.indexes.traffic;
                docDB.variables.indexes.foreigners = doc.variables.indexes.foreigners;
                docDB.variables.indexes.dependency_rate = doc.variables.indexes.dependency_rate;
                collection.save(docDB, cb);
            });

        })
    }

    function removeData(doc, cb) {
        util.mongoConnect(collectionName, function (err, collection) {
            collection.remove({_id : new ObjectId(doc._id)}, {w : 1}, cb);
        })
    }

    return {
        getData: getData,
        postData: postData,
        getSingleData: getSingleData,
        putData: putData,
        removeData: removeData
    };
};