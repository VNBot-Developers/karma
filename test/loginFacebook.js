const { resolve } = require('path');
require('dotenv').config({
    path: resolve(__dirname, '../.env')
})
const { equal, isObject } = require('assert');
const fs = require('fs');
const { pathAppState } = require("../src/config");
const login = require('../src/login');
describe('Facebook', function () {
    this.beforeAll(function () {
        this.skip();
        this.email = process.env.FACEBOOK_EMAIL;
        this.password = process.env.FACEBOOK_PASSWORD;
        this.appState = {};
    })// all suite will be skipped
    describe('Login', function () {

        this.timeout(20 * 1000);
        it('Login with email password', function (done) {
            console.log(this.email, this.password);
            login(this.email, this.password, this.appState, function (error, api) {
                if (error) console.log(error) && done(error);
                done();
            })
        });

        it('Login with appstate', function (done) {
            this.appState = require(pathAppState);
            login(this.email, this.password, this.appState, function (error, api) {
                if (error) console.log(error) && done(error);
                done();
            })
        });

    });
});





