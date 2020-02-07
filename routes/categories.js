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

module.exports = app => {

  let route = app.route('/categories');

  route.get((req, res) =>{

    db.find({}).sort({idCat:1}).exec((err, categorie) =>{

      if (err){

      } else {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json({
          categorie
        });
      }

    });      
  });

};