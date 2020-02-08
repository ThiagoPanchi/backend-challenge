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

    this.id = Number;
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

    db.find({}).sort({id:1}).exec((err, categorie) =>{

      if (err){
        console.log(`error: ${err}`);
          res.status(400).json({
            error: err
          });
      } else {
        res.statusCode = 200;
        res.setHeader('content-type', 'application/json');
        res.json({ categorie });
        res.send({'ok': true});
      }

    });      
  });

  route.post((req,res) => {

    //req.body.childrensId == database.id || 
    if (req.body.childrensId === []){
      db.insert(req.body, (err, categorie) =>{
        if (err) {
          console.log(`error: ${err}`);
          res.status(400).json({
            error: err
          });
        } else {
          res.status(200).json(categorie);
          res.send({'ok': true});
        }
      });  
    } else {
      res.status(400).json({ 'erro': 'ChildrensId Incorreto' });
      res.send({'ok': false});
    }  
  });

  let routeId = app.route('/categories/:id');

  routeId.get((req,res) => {
    db.findOne({id:req.params.id}).exec((err, categorie) => {
      if (err) {
        console.log(`error: ${err}`);
        res.status(400).json({
          error: err
        });
      } else {
        res.status(200).json(categorie);
        res.send({'ok': true});
      }
    });
  });

};