// Include the async package
// Make sure you add "async" to your package.json
var Promise = require('bluebird');
// Array to hold async tasks
var asyncTasks = [];

items = ["s","s","asa","swa","sas","dhsdh","scgdsd","hash"]



items.forEach(function(item){

  asyncTasks.push(new Promise(function(resolve, reject){
    console.log(item);
    resolve();
  }));

});


Promise.all(asyncTasks)
.then(function(success){
  console.log(items);
}, function(err){
  console.log(err);
})



//console.log(asyncTasks);
