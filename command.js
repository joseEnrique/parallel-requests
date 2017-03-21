#!/usr/bin/env node

"use strict";
const program = require('commander');
const parallel_requests = require('./index.js')

let bydirectory = (directory) => {
    parallel_requests.doParallelRequestFromfile(directory)
}

let byduration = (data) => {
    //left d
    parallel_requests.doParallelRequestWithDuration(data.url, data.method, data.count, data.duration, data.body);
}

let infinite = (data) => {
    //left d
    parallel_requests.doRequests(data.url, data.method, data.count, data.body);
}




program
    .version('1.1.0')
    .command('readFile')
    .description('read test from file')
    .option('-p, --path <directory>', 'put the filepath')
    .option('-u, --url <url>', 'put the url')
    .action(bydirectory)

program
    .command('timeResquests')
    .description('execute requests from params during any duration')
    .option('-u, --url <url>', 'put the url')
    .option('-c, --count <count>', 'put the count')
    .option('-d, --duration <duration>', 'put the duration')
    .option('-m, --method <method>', 'put the method')
    .option('-b, --body [body]', 'put the body')
    .action(byduration)

program
    .command('infiniteRequests')
    .description('execute requests from params infinitely')
    .option('-u, --url <url>', 'put the url')
    .option('-c, --count <count>', 'put the count')
    .option('-m, --method <method>', 'put the method')
    .option('-b, --body [body]', 'put the body')
    .action(infinite)



program.parse(process.argv);

//node command.js readFile /home/quique/lab/parallel-requests/src/configurations/config-exec.yaml

//node command.js timeResquests -u http://google.es -c 5 -d 2 -m GET
//node command.js infiniteRequests -u http://google.es -c 5  -m GET
