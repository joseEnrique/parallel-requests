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

var request = require('request');
var Promise = require('bluebird');
//var logger = require('./logger/logger');
//var moment = require('moment');

var doRequest = function(options) {
    //console.log("Building promise");
    return new Promise(function(resolve) {
        var success = null;
        request(options, function(error, response) {
            if (!error) {
                if (parseInt(response.statusCode) > 300) {
                    success = false;
                } else {
                    success = true;
                }

                resolve(success);
            } else {
                success = false;
                resolve(success);
            }
        });
    });
};


module.exports.doParallelRequest = function(url, method, number, body) {
    var options;
    if (method.toUpperCase() == "GET") {
        options = {
            uri: url,
            method: method,
        };
    } else {
        options = {
            uri: url,
            method: method,
            json: true,
            body: body,
        };

    }

    var asyncTasks = [];

    for (var i = 0; i < number; i++) {
        asyncTasks.push(doRequest(options));

    }


    return Promise.all(asyncTasks);


};

/*
module.exports.doTestParallelFromfile() = function(path) {


}
*/
