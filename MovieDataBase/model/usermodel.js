var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = Schema({

    Title : String,
    ReleaseYear : String,
    Director :  String,
    Actor : String ,
    Genre: String


})

module.exports = mongoose.model('Movie', MovieSchema);