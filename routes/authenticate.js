var  express = require('express');
var jwt    = require('jsonwebtoken');
var router = express.Router();
var User = require('../model/RegisterModel.js');
var app = express();
app.secret = 'ilovescotchyscotch' ;
app.set('SuperSecret', app.secret);
var errorHandling =  require('./registrationErrorHandler.js')

/**
 * Sign Up Function
 * Save the User Data to the Database using User Model
 * Throws Error if either of the field not Present , its handled by errorHandling(errorhandler)
 */

router.post('/signup', function(req,res){
    if(req.body.data.Name && req.body.data.Email && req.body.data.Password) {
        var newUser = User({
            Name: req.body.data.Name,
            Email: req.body.data.Email,
            Password: req.body.data.Password
        })

        newUser.save(function (err, docs) {
            if (err) res.send(err)
            else {
                res.json({message: 'User Registered', data :docs })
            }
        });

    }
    else {
        var err = new Error('NotFound')
        errorHandling(err, req, res)
    }
})


/**
 * This is Login Handler
 * Its checks the User Credentials and sends the json response according the User Data
 * If login is Successful, user is assigned the Token
 */

router.post('/login', function(req,res){
    User.findOne({Email:req.body.LoginData.Email}, function(err,user){
        if(!user){
            res.json({success:false , message : 'Authentication failed ! No Email Exists'})

        } else if(user){
            if(user.Password  != req.body.LoginData.Password){
                res.json({success:false , message : 'Authentication failed ! Password Mismatch'})

            } else {
                var token = jwt.sign(user, app.get('SuperSecret'))
                user.Token = token;
                user.save(function(err,user){
                });
                
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    })

});


module.exports = router;