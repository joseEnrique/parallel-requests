'use strict';

var request = require('request');
var Promise = require('bluebird');



var doRequest = function (options) {
	return new Promise(function(resolve, reject){
		request(options,function(error, response, body){
			//console.log(response.statusCode);
			if(!error){
				resolve()
			}else{
				reject(error)
			}
		})
	});
}


module.exports.doParallelRequest= function (url,method,number,body){

	var options = {
			  uri: url,
			  method: method,
			  json: true,
				body: body
			};

	var asyncTasks = []

		for (var i = 0; i < number; i++) {
				asyncTasks.push(doRequest(options));
			}

return  Promise.all(asyncTasks);


}
