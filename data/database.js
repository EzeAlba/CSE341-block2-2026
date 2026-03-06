const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

// Initialize the database connection
const initDb = (callback) => {
    if (database) {
        console.log('Database already initialized!');
        return callback(null, database);
    }
    // Connect to the database
    MongoClient.connect(process.env.MONGODB_PROJECT1_URI)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};