'use strict'

process.env.NODE_ENV = 'test';

var request = require('supertest');
var mongoose = require("mongoose");
var  Movie = require('../model/usermodel.js');
var  User = require('../model/RegisterModel.js');
//Require the dev-dependencies
var chai = require('chai');
var  chaiHttp = require('chai-http');
var expect = chai.expect;

// Rest Api Test
var server = require('../server.js');
var  should = chai.should();
chai.use(chaiHttp);





describe('movie', function() {
    beforeEach(function(done){
        Movie.remove({}, function(err){          // Clearing the Test DB before any Test
            done();
        })


    })


// Test /api/movies
    it('Getting the Movies', function (done) {
            console.log('Movie request')
            chai.request(server)
                .get('/api/movies')

                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                })
        });






// Test POST api/movies
    describe('/Post Movie', function () {

        it('should not post a movie "Dhoni" ', function (done) {
            var movie = {
                MovieData: {

                    Title: 'Dhoni',
                    ReleaseYear: 2005,
                    Actor: 'ddd',
                    Genre: 'Thriller'
                }

            }
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('Title');

                    done();
                })
        });


        it('Able to add all movies ', function (done) {

            var movie = {
                MovieData: {

                    Title: 'Inception',
                    ReleaseYear: 2005,
                    Actor: 'ddd',
                    Genre: 'Thriller',
                    Director: 'Ram Gopal'
                }

            }
            chai.request(server)

                .post('/api/movies')
                .send(movie)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Movie Added Successfully');
                    res.body.movie.should.have.property('Title').eql('Inception');
                    res.body.movie.should.have.property('Director');
                    res.body.movie.should.have.property('Genre');
                    res.body.movie.should.have.property('ReleaseYear');

                    done();
                })
        });

    })


    describe('GetMove/Id', function () {
        it('Get A Movie by Id', function (done) {

            var movie = new Movie({
                Title: 'Dhoni',
                ReleaseYear: 1998,
                Director: 'Ram',
                Actor: 'Leo',
                Genre: 'Thriller'
            })

            movie.save(function (err, movie) {
                chai.request(server)
                    .get('/api/movies/' + movie._id)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('Title');
                        res.body.should.have.property('ReleaseYear');
                        res.body.should.have.property('Director');
                        res.body.should.have.property('Genre');
                        res.body.should.have.property('Actor');
                        res.body.should.have.property('_id').eql(String(movie._id));
                        done()

                    })
            })
        })
    })


    describe('/UpdatingMovieByID', function () {

        it('Updated Movie By Id', function (done) {
            var movie = new Movie({
                Title: 'Dhoni',
                ReleaseYear: 1998,
                Director: 'Ram',
                Actor: 'Leo',
                Genre: 'Thriller'
            })
            movie.save(function (err, movie) {
                chai.request(server)
                    .put('/api/movies/' + movie._id)
                    .send({
                        Title: "The Chronicles of Narnia", ReleaseYear: 1998,
                        Director: 'Ram',
                        Actor: 'Leo',
                        Genre: 'Thriller'
                    })
                    .end(function (err, res) {
                        res.body.movie.should.have.property('Title').eql('The Chronicles of Narnia');
                        res.body.should.have.property('message').eql('Movie Updated!');
                        res.body.movie.should.have.property('ReleaseYear');
                        res.body.movie.should.have.property('Director');
                        res.body.movie.should.have.property('Genre');
                        res.body.movie.should.have.property('Actor');
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.movie.should.have.property('_id').eql(String(movie._id));

                        done()
                    })
            })
        })
    })


    describe('/DeleteMovieById', function () {
        it('Delete the Movie', function (done) {

            var movie = new Movie({
                Title: 'Dhoni',
                ReleaseYear: 1998,
                Director: 'Ram',
                Actor: 'Leo',
                Genre: 'Thriller'
            })

            movie.save(function (err, movie) {
                chai.request(server)
                    .delete('/api/movies/' + movie._id)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('Movie Deleted');
                        chai.request(server)
                            .get('/api/movies/' + movie._id)
                            .end(function (err, res) {
                                res.should.have.status(200); //Testing no movie after Deletion
                                res.body.should.have.property('message').eql('No Movie Exist for ID');

                            })

                        done()
                    })
            })

        })
    })


})

























