var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var schemaName = 'User';
var SALT_FACTOR = 13;

var schema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minlength: 10},
    created: {type: Date, required: true, default: Date.now()}
});

schema.statics.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
};

schema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model(schemaName, schema);