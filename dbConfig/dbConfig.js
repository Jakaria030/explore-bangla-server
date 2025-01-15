const { MongoClient, ServerApiVersion } = require('mongodb');

let db = null;

const connectDB = () => {
    // MongoDB connection URI
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7vwvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const dbName = 'exploreBanglaDB';
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        db = client.db(dbName);
        console.log('MongoDB connected.');
    } catch (error) {
        console.log('MongoDB connection error: ', error);
        process.exit(1);
    }
};

const getCollections = () => {
    if (!db) {
        throw new Error('Database not connected.');
    }

    const userCollections = db.collection('users');
    const packageCollections = db.collection('packages');

    return { userCollections, packageCollections };
};

module.exports = { connectDB, getCollections };