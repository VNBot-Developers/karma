const { resolve } = require('path');
require('dotenv').config({
    path: resolve(__dirname, '../.env')
})
const { equal } = require('assert');
const { createClient, print } = require('redis');
describe('Redis', function () {
    this.beforeAll(function () {
        this.client = createClient({
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: process.env.REDIS_PORT || '6379',
            password: process.env.REDIS_PASSWORD || null,

        });
        this.client.on("error", function (error) {
            console.error(error);
        });

    })
    describe('GET - SET', function () {

        it('Set value to key1 key2 key3', function () {

            this.client.set("key1", "Hello", function (err) {
                equal(err, undefined, "should not have any error!");
            });
            this.client.set("key2", "OK", function (err) {
                equal(err, undefined, "should not have any error!");
            });
            this.client.set("key3", "Bye", function (err) {
                equal(err, undefined, "should not have any error!");
            });
        });

        it('Get value from key1 key2 key3', function () {

            this.client.get("key1", function (err, reply) {
                equal(reply, "Hello", "should return Hello with key1")
            });
            this.client.get("key2", function (err, reply) {
                equal(reply, "OK", "should return OK with key2")
            });
            this.client.get("key3", function (err, reply) {
                equal(reply, "Bye", "should return Bye with key3")
            });
        });

    });
});





