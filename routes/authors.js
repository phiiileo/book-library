const router = require('express').Router();
const Author = require('./../model/author')

// Author home page
router.get('/', async (req, res) => {
    // search queries holder
    const searchOptions = {};
    // check if there is name query
    if (req.query.name !== null || req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        console.log(authors)
        res.render('authors', {
            authors,
            searchOptions: req.query
        })
    } catch (err) {
        res.redirect('/')
    }
})

// Add a new author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name,
        email: req.body.email
    })
    try {
        await author.save();
        res.redirect('/authors')
    } catch (err) {
        console.log(new Error(err).message)
        res.render('authors/new', {
            author: author,
            errorMessage: "Creating user not successful"
        })
    }
})

// Add new Author view page
router.get('/new', (req, res) => {
    res.render('authors/new', {
        author: new Author(),
    })
})


module.exports = router