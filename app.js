if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config()
}
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const createDbConnection = require('./model/db');
const rootRouter = require('./routes');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');
const methodOverride = require('method-override')

// Setting view configuration
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

// General app configuration
app.use(expressLayouts);
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: false,
    limit: '50mb'
}))
app.use(methodOverride('_method'))


// connect db
createDbConnection();


// set up router
app.use('/', rootRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)



// Start up the server and listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is up and running at http://localhost:' + PORT)
})