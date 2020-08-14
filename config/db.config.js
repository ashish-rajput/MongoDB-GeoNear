const mongoose = require('mongoose');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    retryWrites: true,
    useCreateIndex: true,
    useFindAndModify: false,
    w: 'majority',
};


function connectDB() {
    const url = `mongodb://localhost:27017/codebrew`;
    return mongoose.connect(url, options);
}

module.exports = {
    connectDB,
};