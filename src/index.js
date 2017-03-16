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
var childProcess = require('child_process');
var logger = require('./logger/logger');
var fs = require('fs');
var path = require('path');
var jsyaml = require('js-yaml');
var cluster = require('cluster');
var singleDoc;
var total = 0;
var successful = 0;
var error = 0;
module.exports = {
    doParallelRequest: _doParallelRequest,
    doTestParallelFromfile: _doTestParallelFromfile
};



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


function _doParallelRequest(url, method, number, body) {
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


function _doTestParallelFromfile(uri) {

    if (cluster.isMaster) {

        var configString;
        if (!uri) {
            throw new Error("Parameter URI is required");
        } else {
            configString = fs.readFileSync(path.join(__dirname, uri), "utf8");
        }
        //var newConfigurations = jsyaml.safeLoadAll(configString);
        var newConfigurations = [];

        jsyaml.safeLoadAll(configString, function(doc) {
            newConfigurations.push(doc);
        });

        var threads = newConfigurations.length;
        for (var i = 0; i < threads; i++) {
            singleDoc = newConfigurations[i];
            _doc(singleDoc);

            cluster.fork();
        }

    } else {
        // This gets executed if the process is a worker
        console.log('I am the thread: ' + process.pid);
        process.exit(1);
    }

}






function _doc(testConfiguration) {
    var type = testConfiguration.type;

    if (type == "interval") {
        console.log("prueba");
    } else {

        execRequests(testConfiguration).then(function(success) {

            console.log(success);

        });

        //var url = 'http://' + testConfiguration.service.endpoint + ':' + testConfiguration.service.exposePort + request.path + '?user=' + tenant.id;
        //var cmd = 'node ' + tenantScript + ' ' + JSON.stringify(tenant.intervals) + ' ' + tenant.duration + ' ' + request.operation + ' ' + url + ' ' + request.body;
        //logger.debug('setting up tenant: ' + tenant.id + ' \nExecuting cmd: ' + cmd);


        // resolve();
    }
}




var execRequests = function(testConfiguration) {
    return new Promise(function(resolve) {

        var total = 0;
        var success = 0;
        var error = 0;
        var counter_timer = 0;
        var request_ack = 0;

        var interval = setInterval(function() {

            console.log(new Date().toISOString());

            if (counter_timer == testConfiguration.duration) {
                clearInterval(interval);
            }

            _doParallelRequest(testConfiguration.url, testConfiguration.method, testConfiguration.count).then(function(success) {
                success.forEach(function(element) {

                    if (element) {
                        success++;
                    } else {
                        error++;
                    }

                    total++;
                    console.log("logisito" + total);

                });

                request_ack++;

                if (request_ack == testConfiguration.duration + 1) {
                    console.log("total: " + total);
                    resolve(total);
                }

            });
            counter_timer++;

        }, 1000); // setInterval

    });

};



/*
var execRequestsInterval = function() {
    var counter_timer = 0;
    var currentindex = 0;
    var interval = setInterval(function() {

        if (counter_timer >= time) {
            //restart counter-time
            counter_timer = 0;
            //logger.info("Next resquests for element in position " + currentindex);
            currentindex++;

            if (currentindex >= arrayRequest.length) {
                var objectResult = {};
                objectResult.total = total;
                objectResult.success = successful;
                objectResult.error = error;

                console.log(JSON.stringify(objectResult));
                clearInterval(interval);
            }
        }

        requestpall(uri, method, arrayRequest[currentindex], body).then(function(success) {

            success.forEach(function(element) {
                if (element) {
                    successful++;
                } else {
                    error++;
                }
                total++;

            });


        });

        counter_timer++;
    }, 1000);
};
*/
