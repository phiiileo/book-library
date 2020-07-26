const router = require('express').Router();
const Book = require('./../model/book')
const Author = require('./../model/author');


router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        const authors = await Author.find({})
        res.render('index', {
            books,
            authors
        })
    } catch (err) {
        console.log(err)
        res.render('index', {
            books: [],
            authors: []
        })
    }
})

module.exports = router