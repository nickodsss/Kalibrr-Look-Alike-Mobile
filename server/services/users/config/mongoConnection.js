const { MongoClient } = require('mongodb')

const connectionString = process.env.CONNECTION_STRING

let db = null



const mongoConnection = async () => {
    const client = new MongoClient(connectionString)
    try {
        const database = client.db("phase3_challenge2")
        db = database;

        return database;
    } catch (err) {
        await client.close();
    }
}

const getDatabase = () => db;

module.exports = {
    mongoConnection,
    getDatabase,
};