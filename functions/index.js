const functions = require("firebase-functions");
const express = require("express");
const exphbs = require('express-handlebars');
const nodemailer = require("nodemailer");
const path = require("path")



const app = express();

//View engine config
app.engine('handlebars', exphbs({defaultLayout: false}));
app.set('view engine', 'handlebars');

//Static folder
app.use(express.static(__dirname + '/public'));

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  res.set('Cache-Control', 'public, max-age=300')
  res.render('projects')
})

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: functions.config().email.username,
      pass: functions.config().email.password, 
    },
});

app.post("/send", async(req, res) => {
      const mail = {
        from: req.body.name,
        to: functions.config().email.receiver,
        subject: "Contact Request",
        html: `<ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message: ${req.body.message}</li>
            </ul>`,
      };
  
      await transporter.sendMail(mail, (err, data) => {
        if (err) {
          console.log(err);
          res.render('contact', {msg: 'Something went wrong please try my email, or Linkedin. I am probably working to fix this'});
        } else {
          res.render('contact', {msg: 'I have received your message! I will get back to you ASAP!'})}
      });
    });

exports.app = functions.https.onRequest(app)