'use strict'

process.env.NODE_ENV = 'test'; // Setting the Test Enviorment

var mongoose = require("mongoose");

var  User = require('../model/RegisterModel.js');

//Require the dev-dependencies
var chai = require('chai');
var  chaiHttp = require('chai-http');
var expect = chai.expect;
var server = require('../server');
var  should = chai.should();
chai.use(chaiHttp);



// Authentication Tests
describe('check registration', function(done){

    beforeEach(function(done){

        User.remove({}, function(err){
            done();
        })
    })

    it('App should not register a user if any of the registration field missing', function(done){
        var password = {
                data: {
                    Name : 'Rajat',
                    Password : false,
                    Email :'rajatuiet@gmail.com'
                }
            }

            var email = {
                data: {
                    email : false,
                    Name : 'Rajat',
                    Password :'jain'
                }
            }


            var name = {
                data: {
                    Name: false,
                    Password: 'Rajat',
                    Email :'rajatuiet@gmail.com'
                }

            }

            chai.request(server)
                .post('/users/signup')
                .send(password)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('message').eql('Field Missing');

                })

            chai.request(server)
                .post('/users/signup')
                .send(email)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('message').eql('Field Missing');
                })

            chai.request(server)
                .post('/users/signup')
                .send(name)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('message').eql('Field Missing');
                    done();

                })

        })



    it('App should register a user if all fields present', function(done){

        var user = {
            data: {
                Name :'Rajat',
                Password: 'Password123',
                Email :'rajatuiet@gmail.com'
            }

        }

        chai.request(server)
            .post('/users/signup')
            .send(user)
            .end(function(err,res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('User Registered');
                res.body.data.should.have.property('Name').eql('Rajat');
                res.body.data.should.have.property('Password').eql('Password123');
                res.body.data.should.have.property('Email').eql('rajatuiet@gmail.com');
                done()
            })
    })
})



describe('check Login', function(){

    beforeEach(function(done){
        User.remove({}, function(err){
            done();
        })
    })

    it('Not Registered User Not Able to Login', function(done){
        var user = {
            LoginData: {
                Password: 'Password123',
                Email :'rajatuiet@gmail.com'
            }

        }

        chai.request(server)
            .post('/users/login')
            .send(user)
            .end(function(err,res){
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql('Authentication failed ! No Email Exists');
                done();
            })
    })


    it('Wrong Password Not able to Login', function(done) {
        var RegisterUser = new User({
            Name: 'Dhoni',
            Email: 'rajatuiet@gmail.com',
            Password: 'Ram'

        })

        RegisterUser.save(function () {
            var LoginUser = {
                LoginData: {
                    Password: 'Password123',
                    Email: 'rajatuiet@gmail.com'
                }

            }

            chai.request(server)
                .post('/users/login')
                .send(LoginUser)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql('Authentication failed ! Password Mismatch');
                    done()

                })
        })
    })


    it('Correct Credentials User will login and get Token', function(done){

        var RegisterUser = new User({
                Name: 'Dhoni',
                Email: 'rajatuiet@gmail.com',
                Password: 'Ram'

            })

            RegisterUser.save(function () {
                var LoginUser = {
                    LoginData: {
                        Password: 'Ram',
                        Email: 'rajatuiet@gmail.com'
                    }
                }

            chai.request(server)
                .post('/users/login')
                .send(LoginUser)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('message').eql('Enjoy your token!');
                    res.body.should.have.property('token')
                    done()
                })
        })

    })

})












