
const express = require('express');
const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const morgan = require('morgan');
const sendGridTransport = require('nodemailer-sendgrid-transport');


const app = express();

// const {DB_PASSWORD, DB_USERNAME, SENDGRID_API} = process.env;


app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const transporter = nodemailer.createTransport(sendGridTransport({
  auth:{
      api_key:process.env.SENDGRID_API
  }
}))

app.post('/send', (req, res) => {
  const data = req.body
  transporter.sendMail({
      to:'theuncolonized@gmail.com',
      from: 'theuncolonized@gmail.com',
      subject: `Message from ${data.firstName} ${data.lastName}`,
      html:`<h3>${data.firstName} ${data.lastName}</h3>
      <h2>email: ${data.email}</h2>
      <p>${data.message}</p>`
  }).then(resp => {
      res.json({resp})
  })
  .catch(err => {
      console.log(err)
  })
})



// app.post('/email', (req, res, next) => {
//   let data = req.body;
//   let transporter = nodemailer.createTransport(sendGridTransport({
//     service: 'GMAIL',
//    auth:{
//       api_key: SENDGRID_API
//     }
//   }));

//   let mailOptions = {
//     from: data.email,
//     to: 'theuncolonized@gmail.com',
//     subject: `Message from ${data.firstName}  ${data.lastName}`,
//     html: `
//     <h2>Information</h2>
//       <ul>
//         <li>Name: ${data.firstName}  ${data.lastName}</li>
//         <li>Email: ${data.email}</li>
//       </ul>
//       <h3>Message</h3>
//       <p>${data.message}</p>
    
//     `
//   };

//   transporter.sendMail(mailOptions, (error, response) => {

//     if(error){
//       res.send(error)
//     } else {
//       res.send('Success');
//     }

//   })

//   transporter.close();

// });



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {console.log(`Server is running on ${PORT}`)});

