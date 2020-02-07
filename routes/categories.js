let connect = require('camo').connect;
let NeDB = require('nedb'), db = new NeDB({
  filename:'categorie.db',
  autoload:true
});

var database;
var uri = 'nedb://localhost:3000';
connect(uri).then(function(db){
  database = db;
});