const mongoose = require('mongoose');
const ClassmatesSchema = new mongoose.Schema({

    userID: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Classmates = mongoose.model('Classmates', ClassmatesSchema);
module.exports = Classmates;