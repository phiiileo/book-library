const {
    Schema,
    model
} = require('mongoose');
const path = require('path');
const bookBasePath = 'uploads/bookCover'
bookSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true

    },
    imageUrl: {
        type: String,
        required: true
    },
    publish_at: {
        type: Date,
        required: true
    },
    page_count: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }

})

bookSchema.virtual('coverImagePath').get(function () {
    if (this.imageUrl !== null) {
        return path.join('/', bookBasePath, this.imageUrl)
    }
})

Book = model('Books', bookSchema);

module.exports = Book
module.exports.bookBasePath = bookBasePath