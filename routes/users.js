var  express = require('express');
var router = express.Router();
var movie = require('../model/usermodel.js');
var Validate = require('./Validaterequest.js');
var errorHandling =  require('./Errror.js')
var app =  express();


// Testing the Working Enviorment

if(app.get('env') != 'test')
{
    router.use(Validate.ValidateRequest)
}


// Rest Api Handlers
/**
 *Gets all the Movies int the DataBase
 *
 */
router.get('/movies',function(request,response, next) {
    movie.find({ }, function(err,docs){
        response.send(docs);
    })


});

/**
 * Gets a single movie by Id
 * response a json message if there is no Movie found for the Id
 */


router.get('/movies/:id', function(request,response){
    movie.findOne({_id : request.params.id }, function(err,docs){

        if(Object.keys(docs).length === 0){
            res.json({message: 'No Movie Exist for ID', docs:docs})
        }
        response.send(docs);
    })

});

/**
 * Delete the Movie with particular Id and response with a Json message
 */

router.delete('/movies/:id', function (req, res) {
    movie.remove({
        _id: req.params.id
    }, function (err, user) {
        if (err) return res.send(err);
        res.json({ message: 'Movie Deleted' });
    });
});


/**
 * Post Movie
 * Not allowed to Post Movie 'Dhoni' Error is handled by a error Handler(
 */

router.post('/movies', function(request,response, next){

    if(request.body.MovieData.Title == 'Dhoni') {
        var err = new Error('NotFound')
        errorHandling(err, request, response)
    }

    else {
        var rajat = new movie({
            Title: request.body.MovieData.Title,
            ReleaseYear: request.body.MovieData.ReleaseYear,
            Director: request.body.MovieData.Director,
            Actor: request.body.MovieData.Actor,
            Genre: request.body.MovieData.Genre
        })

        rajat.save();
        response.json({message: 'Movie Added Successfully', movie:rajat})
    }

});

/**
 * Updates the Movie By ID
 */
router.put('/movies/:id', function(req,res){
    var promise = function(user){
        return new Promise(function(resolve, reject){
            if (req.body.Title) user.Title = req.body.Title;
            if (req.body.Actor) user.Actor = req.body.Actor;
            if (req.body.ReleaseYear) user.ReleaseYear = req.body.ReleaseYear;
            if (req.body.Director) user.Director = req.body.Director;
            if (req.body.Genre) user.Genre = req.body.Genre;
            return resolve('Updated')

        })
    }
    movie.findById(req.params.id, function (err, user) {
        promise(user).then(function(data){
            user.save( function (err, user){
                if (err) {
                    res.send (err);
                }
                else {
                    res.json({message: 'Movie Updated!', movie: user});
                }
            }).catch(function(){
            })
        })
    });



});


module.exports = router

