var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
mongoose.connect("mongodb+srv://Nikhil:man@cluster0-f1ejb.mongodb.net/test?retryWrites=true", function(err, db) {
    if(err){
    	console.log(err);
    }
 });
/*
var http = require('http');
var fs = require('fs');*/
app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));
var create = new mongoose.Schema({
	name : String,
	Email : String,
	body : String,
  Disease : String,
  created:{type:Date, default: Date.now}
});

var Needy = mongoose.model("Man", create);

/*Needy.create({name : "Rahul Rana", Email:"ranasingh@gamil.com", Credit:3500},
	function(err, cam){
		if(err){
			console.log(err);
		}
		else
		{
			console.log("Success");
		}
	});*/
