const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const ejs = require("ejs");

app.use(express.static('views'));
app.set('view engine', 'ejs');

var port = 3000;
app.listen(port, function(){
  var dir = './uploadedFiles';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir); // 2

  console.log('server on! http://localhost:'+port);
});

var storage  = multer.diskStorage({ // 2
  destination(req, file, cb) {
    cb(null, 'uploadedFiles/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
var upload = multer({ dest: 'uploadedFiles/' }); // 3-1

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.post('/uploadFile', upload.single('attachment'), function(req,res){ // 4 
  res.render('confirmation', { file:req.file, files:null });
});