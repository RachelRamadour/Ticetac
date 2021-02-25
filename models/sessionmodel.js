var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    journey: [{ type: mongoose.Schema.Types.ObjectId, ref: 'journey' }],
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel