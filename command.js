#!/usr/bin/env node
"use strict";
const program = require('commander');
const parallel_requests = require('./index.js')

let bydirectory = (directory) => {
    parallel_requests.doParallelRequestFromfile(directory)
}

let executeOnair = (data) => {
    //left d
    parallel_requests.doParallelRequest(data.url,data.method,data.count,data.duration,data.body);
}





program
    .version('1.0.0')
    .command('file')
    .description('read test from file')
    .option('-p, --path <directory>', 'put the filepath')
    .option('-u, --url <url>', 'put the url')
    .action(bydirectory)

program
    .command('testcommand')
    .description('execute test from params')
    .option('-u, --url <url>', 'put the url')
    .option('-c, --count <count>', 'put the count')
    .option('-d, --duration <duration>', 'put the duration')
    .option('-m, --method <method>', 'put the method')
    .option('-b, --body [body]', 'put the body')
    .action(executeOnair)

program.parse(process.argv);

//node command.js file /home/quique/lab/parallel-requests/src/configurations/config-exec.yaml

//node command.js testcommand -u http://google.es -c 5 -d 2 -m GET
