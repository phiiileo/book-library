if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config()
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const rootRouter = require('./routes');
const createDbConnection = require('./model/db');


// Setting view configuration
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

// General app configuration
app.use(expressLayouts);
app.use(express.static('public'))

// connect db
createDbConnection();


// set up router
app.use('/', rootRouter)



// Start up the server and listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is up and running at http://localhost:' + PORT)
})