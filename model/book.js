const {
    Schema,
    model
} = require('mongoose');
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
    image: {
        type: Buffer,
        required: false
    },
    imageType: {
        type: String,
        required: false
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

bookSchema.set('toObject', { virtuals: true })
bookSchema.set('toJSON', { virtuals: true })

bookSchema.virtual('coverImagePath').get(function () {
    if(this.image != null)
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
})


Book = model('Books', bookSchema);

module.exports = Book
module.exports.bookBasePath = bookBasePath