import {MongoClient, ObjectId} from 'mongodb';
import { DATABASE_HOST_URL, DB_NAME } from "./config/env.js";

const client = new MongoClient(DATABASE_HOST_URL);

await client.connect();
console.log('Connected successfully to server');
const db = client.db(DB_NAME);

const find = async (collectionName, filters) => {
    try {
        const collection = db.collection(collectionName);
        return await collection.find(filters).toArray();
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

const findById = async (collectionName, id) => {
    try {
        const collection = db.collection(collectionName);
        return await collection.findOne({
            _id: new ObjectId(id)
        });
    } catch (e) {
        console.error(e.message);
        return {};
    }
}

const findAll = async (collectionName) => {
    try {
        const collection = db.collection(collectionName);
        return await collection.find({}).toArray();
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

const insertOne = async (collectionName, data) => {
    try {
        const collection = db.collection(collectionName);
        return await collection.insertOne(data);
    } catch (e) {
        console.error(e.message);
        return [];
    }
}

export {
    findAll,
    find,
    findById,
    insertOne,
};

// main(DB_NAME)
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
