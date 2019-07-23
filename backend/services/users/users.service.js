const mongoService = require('../mongo.service');
const ObjectId = require('mongodb').ObjectId;

const COLLECTION_NAME = 'users';

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
    const users = await collection.find(filter).toArray()
    return users;
}

async function create(user) {

    // check if user already exists
    const isUserExists = await _isUserExists(user);
    if (isUserExists) return { error: 'Username is already taken!' };

    // verify user validation


    const collection = await _connectToCollection();
    const result = await collection.insertOne(user);
    user._id = result.insertedId;
    return user;
}

async function update(_id, selectors = {}, user) {
    if (_id) {
        _id = new ObjectId(_id);
        selectors._id = _id;
    }
    const isUserExists = await _isUserExists(user);
    if (isUserExists) return { error: 'Username is already taken!' };

    const collection = await _connectToCollection();
    const result = await collection.updateMany(selectors, { $set: user });
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

async function _isUserExists(user) {
    const duplicates = await query({ username: user.username });
    if (duplicates.length) {
        return true;
    }
    return false;
}
