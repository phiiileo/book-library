const {
    Schema,
    model
} = require('mongoose');

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

Author = model('Authors', authorSchema);

module.exports = Author