const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: (callback) => {
        client.connect((err, db) => {
            //verify we got a good 'db' object
            if (db)
            {
                _db = db.db("trivia");
                console.log("successfully connected to MongoDB");
            }
            return callback(err);
        });
    },

    getDb: () => {
        return _db;
    },
};