const mongoose = require('mongoose');

const SmurfSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    famille: {
        type: String,
        default: 'commun',
        required: true,
    },
    nourriture: {
        type: String,
        default: 'salsepareille',
    },
    amis: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
})

const Smurf = mongoose.model('Smurf', SmurfSchema);

module.exports = Smurf;