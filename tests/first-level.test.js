/*!
parallel-requests 2.0.1, built on: 2017-03-15
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
describe('First Level test', function() {
    this.timeout(10000);
    it('Execute', (done) => {

        lib.doParallelRequest("https://www.google.es/", "GET", 1).then(function(success) {

            expect(success).to.be.equal(true);


        });



        done();

    });
});
