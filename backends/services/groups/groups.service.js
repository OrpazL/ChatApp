const mongoService = require('../mongo.service');
const ObjectId = require('mongodb').ObjectId;

const COLLECTION_NAME = 'groups';


module.exports = {
    query,
    create,
    update,
    delete: remove,
    remove
}

async function query(filter = {}) {
    const collection = await _connectToCollection();
    if (filter._id) {
        filter._id = new ObjectId(filter._id);
    } else if (filter.id) {
        filter._id = new ObjectId(filter.id);
        delete filter.id;
    }
    const groups = await collection.find(filter).toArray()
    return groups;
}

async function create(group) {
    const collection = await _connectToCollection();
    const result = await collection.insertOne(group);
    group._id = result.insertedId;
    return group;
}

async function update(_id, selectors = {}, newData) {
    if (_id) {
        _id = new ObjectId(_id);
        selectors._id = _id;
    }

    const collection = await _connectToCollection();
    const result = await collection.updateMany(selectors, newData);
    return result.modifiedCount;
}

async function remove(_id) {
    _id = new ObjectId(_id);
    const collection = await _connectToCollection();
    const result = await collection.deleteOne({ _id });
    return result.result;
}

async function _connectToCollection() {
    const db = await mongoService.connect();
    const collection = db.collection(COLLECTION_NAME);
    return collection;
}
