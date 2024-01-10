
const express = require('express');

//triviaRoutes is an instance of the express router
//we use it to define our routes
//router will be added as middleware and will take control of requests starting with path /trivia

const triviaRoutes = express.Router();

//connect to the database
const dbo = require("../db/conn");

//convert id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

//Get a list of all the questions

triviaRoutes.route("/trivia").get((req, res) => {
    let db_connect = dbo.getDb("Trivia");
    db_connect
        .collection("Questions")
        .find({})
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

//Get a single question by its id
triviaRoutes.route("/trivia/:id").get((req, res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("Questions")
        .findOne(myquery, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

//Add a new question
triviaRoutes.route("/trivia/add").post((req, response) => {
    let db_connect = dbo.getDb();
    let myObj = {
        question: req.body.question,
        answer: req.body.answer,
    };
    db_connect.collection("Questions").insertOne(myObj, (err, res) => {
        if (err) throw err;
        response.json(res)
    });
});

//Update a question by id
triviaRoutes.route("/update/:id").post((req, response) => {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            question: req.body.question,
            answer: req.body.answer
        },
    };
    db_connect
        .collection("Questions")
        .updateOne(myQuery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

//delete a question
triviaRoutes.route("/trivia/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myQuery = { _id: ObjectId(req.params.id) };
    db_connect.collection("Questions").deleteOne(myQuery, (err, obj) => {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = triviaRoutes;