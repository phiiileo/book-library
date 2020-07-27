const router = require('express').Router();
const Book = require('./../model/book')
const Author = require('./../model/author');
// const fs = require('fs');
// const multer = require('multer');
const path = require('path');
const uploadPath = path.join('public', Book.bookBasePath);
const imageMineTypes = ['image/jpeg', 'image/png', 'image/gif']
// const upload = multer({
//     dest: uploadPath,
//     fileFilter: (req, file, callback) => {
//         callback(null, imageMineTypes.includes(file.mimetype))
//     }
// })

// Author home page
router.get('/', async (req, res) => {
    // search queries holder
    const searchOptions = {};
    // check if there is name query
    if (req.query.title !== null || req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    try {
        const books = await Book.find(searchOptions);

        res.render('books', {
            books,
            searchOptions: req.query
        })
    } catch (err) {
        console.log(err)
        res.render('books', {
            books,
            searchOptions
        })
    }
})

// Add a new author
router.post('/', async (req, res) => {
    // const fileName = req.file !== null ? req.file.filename : null
    console.log(req.body)
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        publish_at: req.body.publish_at,
        page_count: req.body.page_count,
        author: req.body.author,
    })

    saveCover(book, req.body.cover)
    try {
        await book.save();
        res.redirect('/books')
    } catch (err) {
        console.log(err)
        renderNewBookPage(res, book, true)
    }
})

// Add new Author view page
router.get('/new', async (req, res) => {
    renderNewBookPage(res, new Book())
})

const renderNewBookPage = async (res, book, error = false) => {
    try {
        const authors = await Author.find({});
        const data = {
            book,
            authors,
        }
        if (error) {
            data.errorMessage = "Error creating book!"
        }
        res.render('books/new', data)

    } catch (err) {
        console.log(err)
        res.redirect('/books')
    }
}

const saveCover = (book, coverEncoded) => {
    if (coverEncoded == null) return;
    const cover = JSON.parse(coverEncoded);
    if (cover != null && imageMineTypes.includes(cover.type)) {
        book.image = new Buffer.from(cover.data, 'base64')
        book.imageType = cover.type
    }
}

module.exports = router