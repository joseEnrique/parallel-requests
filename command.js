#!/usr/bin/env node

const program = require('commander');
const parallel_requests = require('./index.js')

let bydirectory = (directory) => {
    parallel_requests.doTestParallelFromfile(directory)
}

let executeOnair = (u, c, d, m, b) => {
    parallel_requests.doTestParallelFromfile(directory)
}





program
    .version('0.0.1')
    .command('file')
    .description('read test from file')
    .option('-p, --path <directory>', 'put the filepath')
    .action(bydirectory)
    .command('testcommand')
    .description('execute test from params')
    .option('-u, --url <url>', 'put the url')
    .option('-c, --count <count>', 'put the count')
    .option('-d, --duration <duration>', 'put the duration')
    .option('-m, --method <method>', 'put the method')
    .option('-b, --body [body]', 'put the body')
    .action(executeOnair)

program.parse(process.argv);
