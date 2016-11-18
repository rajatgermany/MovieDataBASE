var app = require('./app.js');
var server = app.listen('3500', function(){
    console.log('Server Started on 3500')
})

module.exports = server


