var  express = require('express');
var jwt    = require('jsonwebtoken');
var app = express();
app.secret = 'ilovescotchyscotch' ;
app.set('SuperSecret', app.secret);

var Validate =
{
    ValidateRequest :function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['authorization'];
        if (token) {
            jwt.verify(token, app.get('SuperSecret'), function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }

}

module.exports = Validate;