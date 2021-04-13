const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/carnetschtroumpf', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));
    
module.exports = mongoose;