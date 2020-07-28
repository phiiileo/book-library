const {
    Schema,
    model
} = require('mongoose');
const Book = require('./book')
authorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

})
authorSchema.pre('remove', function (next) {
    const author = this
    Book.deleteMany({
        author: author._id
    }, (err, res) => {
        if (err) {
            next(err)
        } else if (res) {
            console.log(res)
            next()
        }
    })
})
Author = model('Authors', authorSchema);

module.exports = Author