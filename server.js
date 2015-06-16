var express =  require('express');

var app = express();
var mongojs = require('mongojs');
var db = mongojs('contacts', ['contacts']);
var bodyParser = require('body-parser')

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req, res){
	console.log('I received a GET request');

	db.contacts.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactList', function(req,res){
	console.log(req.body);
	db.contacts.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/contactList/:id', function (req,res){
	var id  = req.params.id;
	console.log(id);
	db.contacts.remove({_id:mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});


//GET REQUEST TO RETRIEVE CONTACT FOR EDITING
app.get('/contactList/:id', function(req,res){
	var id = req.params.id;
	db.contacts.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});


//POST REQUEST TO UPDATE CONTACT
app.put('/contactList/:id', function(req,res) {
	console.log('REQUEST TO UPDATE:');
	console.log(req.body);
	var id = req.params.id;

	db.contacts.findAndModify({query: {_id:mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
		});
});





app.listen(3000);
console.log("Server running on port 3000");