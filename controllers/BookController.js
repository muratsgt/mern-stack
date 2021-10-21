const Book = require("../models/BookModel");

// to return book list
exports.getBookList = async (req, res) => {

    try {
        const BookList = await Book.find();
        res.status(200).json({ BookList });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// to return detail of a book
exports.getBookDetails = async (req, res) => {
    try {
        const BookDetails = await Book.findOne({
            _id: req.params.id,
        });

        if (!BookDetails) {
            return res
                .status(400)
                .json({ msg: "There are no details for this book" });
        }
        res.status(200).json({ BookDetails });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};



    /** 
     * // to help to insert data
    if (req.query.add == 1) {
        try {
            for (const element of BookFile.books) {
                let { title, subtitle, author, published,
                    publisher, pages, description, price } = element;
                let book = new Book({ title, subtitle, author, published,
                    publisher, pages, description, price });
                try {
                    console.log("book :", title, "saved");
                    await book.save();
                } catch (error) {
                    console.log(error.message);
                }
            };
        } catch (error) {
            console.log(error.message);
        }
    }; 
    */