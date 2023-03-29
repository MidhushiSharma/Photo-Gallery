// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const mongoose = require("mongoose");

// // var multer = require('multer')
// // const path=require("path");
// // const app= express();

// // // let UserModel = require('./users');


// // app.set('view engine', 'ejs');
// // app.use(express.static("public"));


// // var storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, 'public', 'avatar'))
// //   },
// //   filename: function (req, file, cb) {
// //     console.log(file)
// //     cb(null, path.extname(file.originalname))
// //   }
// // })


// //   var upload = multer({ storage: storage })


// // app.use(bodyParser.urlencoded({ extended: true }));

// // mongoose.connect("mongodb://localhost:27017/photoalbum", {useNewUrlParser:true});

// // let userSchema = mongoose.Schema({
// //     name: String,
// //     avatar: String
// // });
// // mongoose.exports= mongoose.model('photo', userSchema)
// // const User = new mongoose.model("User", userSchema);
// // // const User: any = {};
// // app.get("/", function(req,res){
// //     res.render("index");
// // });
// // app.get("/gallery", function(req,res){
// //   User.findOne().sort({$natural:-1}).then(function(data) {
// //     res.render("gallery", {data});
// // }).catch(function(error) {
// //     console.log(error);
// //     res.status(400).send({ error: error.message });
// // });
// // });
// // // app.post("/index", upload.single('avatar'), (req, res) => {
// // //   console.log(req.file); // to see uploaded file details
// // //   res.send("Image Uploaded");
// // // }, (error, req, res, next) => {
// // //   console.log(error); // to see error details
// // //   res.status(400).send({ error: error.message });
// // // });
// // app.post('/index', upload.single('avatar'), function(req, res) {
// //   User.create({
// //       name: req.body.name,
// //       avatar: req.file.filename
// //   })
// //   .then(function(data) {
// //     res.send("Image Uploaded");
// //       res.render('gallery', { data });
// //   })
// //   .catch(function(error) {
// //       console.log(error);
// //       res.status(400).send({ error: error.message });
// //   })
// // });


// // app.listen(8000, function(){
// //     console.log("Server started on the port 8000");
// // });

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// var multer = require('multer')
// const path=require("path");
// const { builtinModules } = require("module");
// const router= express();

// router.set('view engine', 'ejs');
// router.use(express.static("public"));

// let userSchema = mongoose.Schema({
//     name: String,
//     avatar : String
//   })
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/images/uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname + '-' + Date.now())
//     }
//   })
   
//   var upload = multer({ storage: storage })
  
//   /* GET home page. */
//   router.get('/', function(req, res, next) {
//     res.render('index');
//   });
  
  
//   /* GET home page. */
//   router.get('/gallery', function(req, res, next) {
//     res.render('gallery');
//   });
  
//   router.post('/inedx',upload.single('avatar'), function(req,res){
//     UserModel.create({
//       name : req.body.name,
//       avatar : req.file.filename
//     })
//     .then(function(data){
//       res.render('gallery',{data})
//     })
//   })
  
// router.listen(8000, function(){
//     console.log("Server started on the port 8000");
// });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var multer = require('multer')
const path=require("path");
const router= express();

router.set('view engine', 'ejs');
router.use(express.static("public"));
let UserModel = require('./users')
// let userSchema = mongoose.Schema({
//     name: String,
//     avatar : String
// })
// const User = mongoose.model('User', userSchema);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/avatar')
    },
    filename: function (req, file, cb) {
        cb(null, path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })
  
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/gallery', function(req, res, next) {
    User.findOne().sort({$natural:-1}).then(function(data) {
        res.render("gallery", {data});
    }).catch(function(error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    });
});

router.post('/index', upload.single('avatar'), function(req,res){
    UserModel.create({
        name : req.body.name,
        avatar : req.file.filename
    })
    .then(function(data){
        res.render('gallery',{data})
    })
    .catch(function(error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    })
})
  
router.listen(8000, function(){
    console.log("Server started on the port 8000");
});
module.exports = router;