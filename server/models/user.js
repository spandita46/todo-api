const {
    mongoose
} = require('../db/mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
    }
});

module.exports = {
    User
}