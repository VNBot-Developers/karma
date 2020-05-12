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
        this.email = process.env.FACEBOOK_EMAIL;
        this.password = process.env.FACEBOOK_PASSWORD;
        this.appState = {};
    })
    describe('Login', function () {

        this.timeout(20 * 1000);
        it('Login with email password', function (done) {
            
            login(this.appState, this.email, this.password, function (error, api) {
                if (error) console.log(error) && done(error);
                done();
            })
        });

        it('Login with appstate', function () {
            this.appState = require(pathAppState);
            login(this.appState, "", "", function (error, api) {
                if (error) console.log(error) && done(error);
                done();
            })
        });

    });
});





