const URL = 'mongodb+srv://chatapp:chatapp@chatappdb-5uz6m.mongodb.net/chatapp_db';

let dbConnection = null;
let disconnectDBInterval;

async function connect() {

    // Reuse existing connection if exists
    if (dbConnection) return dbConnection;

    const mongo = require('mongodb').MongoClient;

    // create new DB connection
    const client = await mongo.connect(URL, { useNewUrlParser: true });
    console.log('Connected to MongoDB!');

    // disconnect DB on long idle
    disconnectDBInterval = setInterval(() => {
        client.close();
    }, (100 * 60 * 60 * 2)); // ms * s * m * h

    // handle DB disconnection
    client.on('close', () => {
        console.log('Disconnected from MongoDB!');
        dbConnection = null;
        clearInterval(disconnectDBInterval);
    });

    dbConnection = client.db();
    return dbConnection;

}

module.exports = {
    connect
};
