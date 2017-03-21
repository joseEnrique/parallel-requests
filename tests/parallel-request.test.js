/*!
parallel-requests 2.2.0, built on: 2017-03-21
Copyright (C) 2017 Jose Enrique Ruiz Navarro
http://www.isa.us.es/
https://github.com/joseEnrique/parallel-requests

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/


'use strict';

var expect = require('chai').expect;
var lib = require('../src');


/*
 * USE MOCHA AND CHAI for testing your code
 */
describe('GET google', function() {
    this.timeout(2000);
    it('Execute', (done) => {
        lib.doParallelRequestWithDuration("https://www.google.es/", "GET", 2, 1).then(function(success) {
            expect(success.totalRequest).to.be.equal(2);
            done();
        });
    });
});
describe('POST failed ', function() {
    this.timeout(2000);
    it('Execute', (done) => {
        lib.doParallelRequestWithDuration("https://www.google.es/", "POST", 2, 1).then(function(success) {
            expect(success.error).to.be.equal(2);
            done();
        });
    });
});

describe('POST successful', function() {
    this.timeout(4000);
    it('Execute', (done) => {
        lib.doParallelRequestWithDuration("https://jsonplaceholder.typicode.com/posts", "POST", 2, 1, "{	\"systerminal\": 1}").then(function(success) {
            expect(success.success).to.be.equal(2);
            done();
        });
    });
});


describe('GET only ONE successful', function() {
    this.timeout(4000);
    it('Execute', (done) => {
        lib.doOneStackOfRequest("http://systerminal.com", "GET", 2).then(function(success) {
            console.log(success);
            expect(success.success).to.be.equal(2);
            done();
        });
    });
});



describe('By config file, 3 test successful', function() {
    this.timeout(17000);
    it('Execute', (done) => {
        lib.doParallelRequestFromfile('./tests/config-test.yaml').then(function(success) {
            console.log(success);
            expect(success.length).to.be.equal(3);
            done();

        });

    });
});
