const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageLink: {
        type: String,
    },
    link: {
        type: String,
    },
    language: {
        type: String,
    },
    pages: {
        type: Number
    },
    year: {
        type: Number,
    },
    country: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Book = mongoose.model("book", BookSchema);

module.exports = Book;