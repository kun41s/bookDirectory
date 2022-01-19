const express = require("express");
const Book = require("../models/book");
const mongoose = require("mongoose");
const router = express.Router();

router.route("/")
    .get((req, res) => {
        Book.find(function(err, books) {
            if(err){
                res.status(404).json({
                    error : "Books not found"
                })
            }else{
                res.status(200).json({
                    books : books
                })
            }
        })
    })
    .post(function(req, res){
        const book = new Book({
            _id : new mongoose.Types.ObjectId,
            bookName : req.body.bookName,
            authorName : req.body.authorName,
            publicationName : req.body.publicationName,
            publishYear : req.body.publishYear,
            bookPrice : req.body.bookPrice
        })
        book.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newbook : result
            })
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
    })
    .delete(function (req, res) {
        Book.deleteMany(function (err) {
          if (!err) {
            res.send("Successfully deleted all Books");
          } else {
            res.send(err);
          }
        });
      })


router.route("/:bookName")
    .get((req, res) => {
        Book.findOne({bookName: req.params.bookName}, 
            function(err, book){
                if(err){
                    res.status(404).json({
                        error : "Book not found"
                    })
                }else{
                    res.status(200).json({
                        book : book
                    })
                }
            })
    })
    .patch(function(req, res){
        Book.updateOne(
            {
                bookName: req.params.bookName
            },
            {$set: req.body},
            function(err, result){
                if(err){
                    res.status(404).json({
                        error : "Book not found"
                    })
                }else{
                    res.send("Successfully updated");
                }
            }
        )
    })
    .delete(function(req, res) {
        Book.deleteOne({bookName: req.params.bookName}, function(err , result){
            if(err){
                res.status.apply(500).json({
                    error : "Cannot delete book"
                })
            }else{
                console.log(result)
                res.status(200).json({
                    delete : "Book deleted successfully"
                })
            }
        })
    });



module.exports = router;