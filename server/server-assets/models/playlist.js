var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var schemaName = 'Playlist';

var schema = new Schema({
    artworkUrl100: {type: String, required: true},
    artistName: {type: String, required: true},
    trackName: {type: String, required: true},
    trackPrice: {type: String, required: true},
    collectionName: {type: String, required: true},
    previewUrl: {type: String, required: true},
    count: {type: Number, required: true, default: 0},
    userId: {type: ObjectId, ref: 'User'}
});

module.exports = mongoose.model(schemaName, schema);