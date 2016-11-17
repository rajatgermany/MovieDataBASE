var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegisterSchema = Schema({

    Name : String,
    Email : String ,
    Password : String,
    Token : String
})

module.exports = mongoose.model('Register', RegisterSchema);