'use strict';

var request = require('request');
var Promise = require('bluebird');
var winston = require('winston');


var doRequest = function(options) {
    //console.log("Building promise");
    return new Promise(function(resolve, reject) {
        request(options, function(error, response, body) {
            if (!error) {
                if (response.statusCode == "404") {
                    winston.info("Request failed " + response.statusCode)
                }
                resolve();
            } else {
                //winston.info(response || error)
                console.log(response || error);
                reject(error);
            }
        })
    });
}


module.exports.doParallelRequest = function(url, method, number, body) {
    if (method.toUpperCase() == "GET") {
        var options = {
            uri: url,
            method: method,
        };
    } else {
        var options = {
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


}
