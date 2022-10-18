const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const ejs = require("ejs");

app.use(express.static('views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
	const dir = "./uploads";
    if(!fs.existsSync(dir)) {
    	fs.mkdirSync(dir);
    }
    console.log("서버 실행");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.post('/upimage', upload.single('img'), (req, res, next) => {
    res.status(200).send({
        message: "Ok",
        fileInfo: req.file
    })
});