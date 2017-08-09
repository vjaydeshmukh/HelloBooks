"use strict";
import chai from 'chai';
import should from 'should';
import supertest from 'supertest';
import app from '../app.js';

let expect = chai.expect();

//Define the API url
const api = supertest('http://localhost:4000');


describe('Unit test for signin and signup routes ', () => {
    /**
     * Signup: Test if user with credentials can signup
     * username: 'newusername'
     * email: 'newemail@email.com'
     * password: 'newpassword'
     */
    it('SIGNUP: User should be able signup successfully', (done) => {
        api.post('/api/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            username: 'neusername',
            email: 'neemail@email.com',
            password: 'newpassword'
        })
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            done(err);
        });
    });


    /**
     * Signup: Test if user with incomplete credentials (username) can signup
     * username: ''
     * email: 'newemail@email.com'
     * password: 'newpassword'
     */
    it('SIGNUP: User should not be able signup successfully', (done) => {
        api.post('/api/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            username: '',
            email: 'newemail@email.com',
            password: 'newpassword'
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.success.should.equal(false);
            res.body.message.should.equal('Oops! Username is required!');
            done(err);
        });
    })

    /**
     * Signup: Test if user with incomplete credentials (email) can signup
     */
    it('SIGNUP: User should not be able signup successfully', (done) => {
        api.post('/api/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            username: 'newUser',
            email: '',
            password: 'newpassword'
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            done(err);
        });
    })



    /**
     * Signin: Unit test for User signin with complete parameters
     */
    it('SIGNIN: User should be ble to signin successfully', (done) => {
        api.post('/api/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            username: 'username',
            password: 'password'
        })
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('user');
            done(err);
        });
    });

    /**
     * Signin: Unit test for User signin incomplete parameters
     */
    it('SIGNIN: User should be not be able to signin successfully', (done) => {
        api.post('/api/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            username: '',
            password: 'password'
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('message');
            done(err);
        });
    });

    /**
     * Signin: Unit test for User signin incomplete parameters
     */
    it('SIGNIN: User should be not be able to signin successfully', (done) => {
        api.post('/api/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            username: 'username',
            password: ''
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('message');
            done(err);
        });
    });
});