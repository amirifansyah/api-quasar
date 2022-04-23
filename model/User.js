
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    namaLengkap: {
        type: String,
    },
    email: {
        type: String,
    },
    noTelp: {
        type: String,
    },
    role: {
        type: Number,
    },
    password: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserSchema);
