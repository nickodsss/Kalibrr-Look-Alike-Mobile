const { ObjectId } = require("mongodb")
const { getDatabase } = require('../config/mongoConnection')

class User {
    static getCollections() {
        const db = getDatabase();
        const users = db.collection("users");
        return users;
    }

    static async findAll() {
        return this.getCollections().find().toArray();
    }

    static async findById(objectId) {
        return this.getCollections().findOne({
            _id: new ObjectId(objectId),
        }, {
            projection: {
                password: 0
            }
        });
    }

    static async create({ username, email, password, phoneNumber, address }) {
        return this.getCollections().insertOne({
            username,
            email,
            password,
            role: 'Admin',
            phoneNumber,
            address
        });
    }

    static async destroy(objectId) {
        return this.getCollections().deleteOne({
            _id: new ObjectId(objectId),
        });
    }
}

module.exports = User