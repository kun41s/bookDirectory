const express = require("express");
const mongoose = require("mongoose");
const book = require("./api/routes/book");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/bookDir", { useNewUrlParser: true });

mongoose.connection.on("error", (error) => {
    console.log(error);
  });
  
mongoose.connection.on("connected", (connected) => {
    console.log("Connected with Mongoose");
}); 

app.use("/book", book);

app.use((req, res, next) => {
    res.status(404).json({
        error : "Bad URL"
    })
});

module.exports = app;