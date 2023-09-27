const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer')
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const createError = require('http-errors');
// File upload settings  
const PATH = '../src/uploads';
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const newName = uniqueSuffix + '-' + file.originalname;
    cb(null, newName);
    // req.post("new", newName);
    // console.log(sessionStorage.getItem("userId"));
    // app.post('/images', newName);
    // localStorage.setItem("newFile", newName);
  }

});
let upload = multer({
  storage: storage
});
// Express settings
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/api', function (req, res) {

  res.end('File catcher');
});
// POST File
app.post('/api/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });
  } else {
    console.log('File is available!');
    return res.send(
      // success: true,
      req.file.filename,
    )
  }
});





// const express = require('express');
// const bodyParser = require('body-parser');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(bodyParser.json());
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*"; // password will generate this characters
var string_length = 8; //password auto-generated length
var newpassword = ''; // password container

app.get('/forgotPass', function(req, res){
  res.end('FogotPassPage');
});
app.post('/forgotPass/sendFormData', (req, res) => { // for-loop for auto-generated password

  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    newpassword += chars.substring(rnum, rnum + 1);

  }

  //------------TERMINAL DISPLAY
  console.log("\n\nSent new password : " + newpassword); // terminal display for auto-generated password
  console.log(req.body, 'data of form'); // terminal display for inputted data



  //-------------------------------------------TRANSPORTER
  var transporter = nodemailer.createTransport({
    service: 'hotmail',
    host: 'smtp-mail.outlook.com', //host for outlook
    port: 587, //port for outlook
    // host: 'smtp.gmail.com', -- for gmail
    // secure: 'true',
    secureConnection: false, // TLS requires secureConnection to be false
    // port: '465',

    auth: {
      user: 'airpets.2023@outlook.com',
      pass: '2023airpets' //2023airpets
    }
    
  });

  var mailOptions = {

    from: 'airpets.2023@outlook.com',
    // to: 'chrestian.tuazon@fujitsu.com',
    to: `${req.body.name} <${req.body.email}>`,
    // cc:`${req.body.name} <${req.body.email}>`,
    subject: 'Sending Email using Node.js',
    html: `

    <h2 style="color:#ff6600;">Hello ${req.body.name}!,  Welcome to AirPets!</h2><br>
    <h4>Here's your new password.<br>
    <b style="font-size: 35px;">${newpassword}</b><br>
    You can change it anytime on your Profile > Edit Pofile > Edit Password.</h4><h5><br>
    Thank you for trusting Airpets.<br>Protect your credentials at all cost. Have a nice day.</h5>Airpets 2023<br><br><br>

            <table style="width: 40%; border: none">
              <thead>
                <tr style="background-color: #000; color: #fff;">
                  <th style="padding: 10px 0">Name</th>
                  <th style="padding: 10px 0">E-mail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th style="text-align: center">${req.body.name}</th>
                  <td style="text-align: center">${req.body.email}</td>
                  
                </tr>
              </tbody>
            </table><br><br>
          `,
  };

  // res.send(newpassword);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("--------ERROR!! Email failed to send.--------");
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        password: newpassword,
        message: 'Successfuly sent!'
      })
      newpassword = '';
    }
  });
});
// const server = 
// Create PORT
// const PORT = process.env.PORT || 8081;

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log('Connected to port ' + PORT)
})