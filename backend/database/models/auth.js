const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    login: {
        type: String,
        trim: true,
        minlength: 3
    },
    pass: {
        type: String,
    },
    smurfId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Auth = mongoose.model('Auth', AuthSchema);

module.exports = Auth;