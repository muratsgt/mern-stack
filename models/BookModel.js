const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: [String],
    },
    pages: {
        type: Number
    },
    published: {
        type: Date,
    },
    publisher: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Book = mongoose.model("book", BookSchema);

module.exports = Book;