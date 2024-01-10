const { MongoClient } = require("mongodb");
const Db = process.env.MONGO_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;

module.exports = {
    connectToServer: async function (callback) {
        console.log("connected")

        try {
             client.connect((err, db) => {
                //verify we got a good 'db' object
                if (db)
                {
                    _db = db.db("Trivia");
                    console.log("successfully connected to MongoDB");
                }
            })
        } catch (e) {
            console.error(e)
        }
    },

    getDb: () => {
        return _db;
    },
};