const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookName : String,
    authorName : String,
    publicationName : String,
    publishYear : Number,
    bookPrice : Number
})

module.exports = mongoose.model("Book", bookSchema);