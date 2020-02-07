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

var Document = require('camo').Document;

class Categorie extends Document{
  constructor(){
    super();

    this.idCat = Number;
    this.name = String;
    this.childrensId = [Number];
    this._id = String;      
  }

  static collectionName(){
    return 'categories';
  }
}