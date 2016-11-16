var express = require('express');
var  bodyParser = require('body-parser');
var mongoose = require('mongoose')
var path = require('path')



var app = express();

var config = require('./config/appconfiguration.js')
mongoose.connect(config.Db());

var users = require('./routes/users.js');
var authenticate = require('./routes/authenticate.js')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', users);
app.use('/users', authenticate);
app.use(express.static(path.join(__dirname, 'Development')));




app.get('/MovieDataBase', function(request,response){

    response.sendFile('./Development/components/index.html', {root : __dirname })
})



app.all('/MovieDatabase/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('./Development/components/index.html', { root: __dirname });
});



module.exports = app;