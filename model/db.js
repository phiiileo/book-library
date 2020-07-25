const mongoose = require('mongoose');


// connect to the db
const createDbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useFindAndModify: true,
        useNewUrlParser: true
    }, (err) => {
        if (err) {
            throw err
        }
        console.log('Local Db connected successfully')

    })
    // get connection instance
    db = mongoose.connection;
}
module.exports = createDbConnection