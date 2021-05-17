const express = require("express");
const exphbs = require('express-handlebars');
const nodemailer = require("nodemailer");
const path = require("path")
require("dotenv").config();

const app = express();

//View engine config
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');

//Static folder
app.use(express.static(__dirname + '/public'));

//Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/projects', (req, res) => {
  res.render('projects')
})

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
});

app.post("/send", (req, res) => {
      //2. You can configure the object however you want
      const mail = {
        from: req.body.name,
        to: process.env.RECEIVER,
        text: `${req.body.name} <${req.body.email}> \n${req.body.message}`,
      };
  
      //3.
      transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.render('contact', {msg: 'Something went wrong, please try again'});
        } else {
          res.render('contact', {msg: 'I have received your message! I will get back to you ASAP!'})}
      });
    });

  const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});