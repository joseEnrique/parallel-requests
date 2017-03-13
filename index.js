'use strict';

var request = require('request');
var Promise = require('bluebird');

var doRequest = function(options) {
    //console.log("Building promise");
    return new Promise(function(resolve, reject) {
        var success = null;
        request(options, function(error, response, body) {
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
        })
    });
}


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


}
