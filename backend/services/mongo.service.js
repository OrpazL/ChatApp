const URL = 'mongodb+srv://chatapp:chatapp@chatappdb-5uz6m.mongodb.net/chatapp_db';

let dbConnection = null;

async function connect() {

    // Reuse existing connection if exists
    if (dbConnection) return dbConnection;

    const mongo = require('mongodb').MongoClient;

    // create new DB connection
    const client = await mongo.connect(URL, { useNewUrlParser: true });
    console.log('Connected to MongoDB!');

    // handle DB disconnection
    client.on('close', () => {
        console.log('Disconnected from MongoDB!');
        dbConnection = null;
    });

    dbConnection = client.db();
    return dbConnection;

}

module.exports = {
    connect
};
