const express = require('express')
var cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const bodyParser = require('body-parser');
const config = require("config");
//

var path = require('path');     

const File = require("./model/fileSchema");
const Rents = require("./model/rentSchema");
const Sale = require('./model/saleSchema');
const Mortgage = require('./model/mortgageSchema');
const User = require('./model/userSchema');
const multer = require("multer");



app.use('/files', express.static('public/files'))
// support parsing of application/json type post data
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
require("./startup/db")();























app.use(cors())

app.post('/login', async(req,res,next) => {

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('نام کاربری یا رمز عبور اشتباه است!');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('نام کاربری یا رمز عبور اشتباه است!');

  const token = user.generateAuthToken();
  res.send(token);


})

app.post('/register', async(req, res, next) =>{
  
 

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));

})


app.delete('/admin/delete', async(req, res, next) => {

  switch(req.query.post_type){
    case('rent'):
      const rent =  Rents.deleteOne({ _id: req.query.id }).exec()
      res.status(200).send(rent)
    break;

    case('sale'):
      const sale =  Sale.deleteOne({ _id: req.query.id }).exec()
      res.status(200).send(sale)
    break;

    case('full_mortgage'):
      const mortgage =  Mortgage.deleteOne({ _id: req.query.id }).exec()
      res.status(200).send(mortgage)
    break;

    default: return true
    
  }
  
})


app.put('/admin/publish', async(req, res, next) => {

  const filter = { _id: req.query.id };
  const update = { is_published: true };

  switch(req.query.post_type){
    case('rent'):
      const rent =  Rents.findOneAndUpdate(filter, update,{
        new: true
      }).exec()
      res.status(200).send(rent)
    break;

    case('sale'):
      const sale =  Sale.findOneAndUpdate(filter, update).exec()
      res.status(200).send(sale)
    break;

    case('full_mortgage'):
      const mortgage =  Mortgage.findOneAndUpdate(filter, update).exec()
      res.status(200).send(mortgage)
    break;

    default: return true
    
  }
  
})

// post submit


app.get('/admin/received', async(req,res,next) => {
  const mortgage = await Mortgage.find({ is_published : false }).exec();
  const rent = await Rents.find({ is_published : false }).exec();
  const sale =  await Sale.find({ is_published : false }).exec();
  res.send([...sale,...rent,...mortgage])
  
})

app.get('/all_posts', async(req, res, next) => {
  const mortgage = await Mortgage.find({ is_published : true }).exec();
  const rent = await Rents.find({ is_published : true }).exec();
  const sale =  await Sale.find({ is_published : true }).exec();
  res.send([...sale,...rent,...mortgage])  
})



app.post('/rent' , async(req,res,next) => {
  rents = new Rents(req.body);
  await rents.save();
  res
    .status(200)
    .send(_.pick(rents, ["_id", "images", "address"]))

})


app.post('/sale' , async(req,res,next) => {
  let sales = new Sale(req.body);
  await sales.save();
  res
    .status(200)
    .send(_.pick(sales, ["_id", "sale"]))

})

app.post('/full_mortgage' , async(req,res,next) => {
  let sales = new Mortgage(req.body);
  await sales.save();
  res
    .status(200)
    .send(_.pick(sales, ["_id", "full_mortgage"]))

})




app.get('/rent/postdetail',async (req, res, next) => {
  const post = await Rents.findById(req.query.id);
  res.send(post)
  console.log(post)

})


app.get('/sale/postdetail',async (req, res, next) => {
  const post = await Sale.findById(req.query.id);
  res.send(post)
  console.log(post)

})

app.get('/full_mortgage/postdetail',async (req, res, next) => {
  const post = await Mortgage.findById(req.query.id);
  res.send(post)
  console.log(post)

})


  app.get('/rents', async (req, res, next) => {

    const doc = await Rents.find({ is_published : true}).exec()
    res.json(doc)
  })



  app.get('/sales', async (req, res, next) => {
    const doc = await Sale.find({ is_published : true}).exec()
    res.json(doc)
  })


  app.get('/mortgages', async (req, res, next) => {
    const doc = await Mortgage.find({ is_published : true}).exec()
    res.json(doc)
  })


//upload file
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpg" || 'jpeg') {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };

  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    
  });



//
  app.post('/upload',upload.single("file"), async (req, res, next) => {
    try {
      const newFile = await File.create({
        name: req.file.filename,
      })
      res.status(200).json({
        status: "success",
        message: "File created successfully!!",
        url : 'http://localhost:3001/'+ req.file.filename
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  });


  app.get("/getFiles", async (req, res) => {
    try {
      const files = await File.find({name:'files/admin-file-1669452626131.png'});
      res.status(200).json({
        status: "success",
        files,
      });
    } catch (error) {
      res.json({
        status: "Fail",
        error,
      });
    }
  });





const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`Listening on port ${port}`));
