const {MongoClient} = require('mongodb');
const {config} = require('./config/config');
class Database{
    async getConnection(){
        try{
            const client = new MongoClient(config.get('dbURL'), {useUnifiedTopology:true});
            const connection = await client.connect();
            return connection;
        }catch(e){
            throw e;
        }
    }

    async insertOne(insertOneParams){
        let client;
        try{
            client = await this.getConnection();
            console.log(`Connected to DB`);
            const db = client.db(config.get('dbName'));
            const collection = db.collection(insertOneParams.collection);
            const data = await collection.insertOne(insertOneParams.data);
            return data;
        }catch(e){
            throw e;
        }finally{
            client.close();
        }
    }

    async countDocuments(countParams) {
        let client;
        try{
            client = await this.getConnection();
            console.log(`Connected to DB`);
            const db = client.db(config.get('dbName'));
            const collection = db.collection(countParams.collection);
            const data = await collection.countDocuments(countParams.query, countParams.options);
            return data;
        }catch(e){
            throw e;
        }finally{
            client.close();
        }
    }

}

module.exports = {Database};