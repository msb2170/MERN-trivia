const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
require('dotenv').config({ path: "./config.env"});
const port = process.env.PORT || 5000;
app.use(cors());
app.use(cors({
    origin: "https://mern-trivia-one.vercel.app/"
}));
const bodyParser = require("body-parser")

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

//Mongoose connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(require("./routes/record"))


app.listen(port, async () => {
    console.log(`Server is running on port: ${port}`);
});