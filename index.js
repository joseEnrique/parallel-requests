"use strict";
var parallel_requests = require("./src");


module.exports = {
    doParallelRequestWithDuration: parallel_requests.doParallelRequestWithDuration,
    doParallelRequestFromfile: parallel_requests.doParallelRequestFromfile,
    doOneStackOfRequest: parallel_requests.doOneStackOfRequest,
    doRequests: parallel_requests.doRequests
};
