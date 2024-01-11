
const express = require('express');

//triviaRoutes is an instance of the express router
//we use it to define our routes
//router will be added as middleware and will take control of requests starting with path /trivia

const triviaRoutes = express.Router();

const Question = require('../models/Question');

console.log(Question)

//convert id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

//Get a list of all the questions

triviaRoutes.route("/trivia").get(async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving questions' });
      }
});

//Get a single question by its id
triviaRoutes.route("/trivia/:id").get(async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ error: 'Question not found' });
        res.json(question);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving question' });
      }
});

//Add a new question
triviaRoutes.route("/trivia/add").post(async (req, res) => {
    try {
        const question = new Question(req.body);
        const savedQuestion = await question.save();
        res.json(savedQuestion);
      } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error saving question' });
      }
});

//Update a question by id
triviaRoutes.route("/update/:id").post(async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) return res.status(404).json({ error: 'Question not found' });
        res.json(updatedQuestion);
      } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Error updating question' });
      }
});

//delete a question
triviaRoutes.route("/trivia/:id").delete(async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) return res.status(404).json({ error: 'Question not found' });
        res.json(deletedQuestion);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting question' });
      }
});

module.exports = triviaRoutes;