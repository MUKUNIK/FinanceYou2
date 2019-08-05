var express = require("express"),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser");

var app = express();
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://Nikhil:man@cluster0-f1ejb.mongodb.net/test?retryWrites=true&w=majority", function(err, db) {
    if(err){
    	console.log(err);
    }
 });
app.set('view engine', 'ejs');
app.use(express.static("public"));

var schema = new mongoose.Schema({
  name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    mail: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    user:{
      type:String,
      required:true,
      minlength:5,
      maxlength:50
    },

    pass: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    balance : {type: Number, default: 0},
	created:{type:Date, default: Date.now}
});

var data=mongoose.model("data", schema);
app.get("/", function(req,res){
  res.redirect("/login");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.get("/signup", function(req, res){
  res.render("signup");
});

app.get("/needy", function(req , res){
  Needy
});

app.post("/login", async(req,res)=>{
  let aut1 =await data.findOne({mail : req.body.data.mail});
  if(aut1){
    res.redirect("/signup")
  }
  else{
  data.create(req.body.data,function(err,newuser){
    if(err){
      res.redirect("/signup")
    }
    else {
      res.render("login");
    }
  });
}});


app.post("/main", async(req,res)=>{
  let aut = await data.findOne({mail : req.body.Match.mail, pass: req.body.Match.pass})
  if(aut){
      data.findById(aut._id,function(err,found){
        if(err){
          res.redirect("/login");
        }
        else{
          res.render("main", {found : found});
        }
      })
  }
  else{
    res.redirect("/login");
  }
});

app.post("/main/transfer/:id", function(req,res){
  res.render("transfer", {id : req.params.id});
});

app.post("/main/recharge", function(req,res){
  res.render("recharge");
});

app.post("/main/recharge/new", async(req,res)=>{
  let aut = await data.findOne({mail : req.body.recharge.mail});
  if(aut){
    data.findOneAndUpdate({ mail: req.body.recharge.mail },
        { "$inc": { balance : req.body.recharge.amount } },{new:true},function(err, response) {
     if (err) {
     console.log("Error");
    }
  });

    res.redirect("/");
  }

  else {
    res.redirect("/");
  }
})

app.post("/main/tranfer/new/:id", async(req,res)=>{
  let aut = await data.findOne({mail : req.body.trans.mail});
  let aut2 = await data.findOne({_id : req.params.id});
  if(aut&&aut2.balance>=req.body.trans.amount){
    data.findOneAndUpdate({ mail: req.body.trans.mail },
        { "$inc": { balance : req.body.trans.amount } },{new:true},function(err, response) {
     if (err) {
     console.log("Error");
    }
    });

    data.findOneAndUpdate({ _id : req.params.id },
        { "$inc": { balance : -(req.body.trans.amount) } },{new:true},function(err, response) {
     if (err) {
     console.log("Error");
    }
    });
    res.redirect("/");
  }
  else {
    res.redirect("/");
  }
})

app.listen(9000, process.env.IP, function(res,err){
  if(!err){
    console.log("Listening at port 9000");
  }
});
