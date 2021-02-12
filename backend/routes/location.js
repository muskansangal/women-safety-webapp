const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const nodemailer = require("nodemailer");
const Mail = require('nodemailer/lib/mailer');
const config=require('./Connection');

let arrEmail=[],location,user,urlofEmail="",blobUrl="";
let statusCode=500,msg="";

sendEmail = () =>{
   nodemailer.createTestAccount((err, account) => {
    console.log("hey called")
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        msg="Emails not sent";
        return 0;
    }
    else{
      console.log('Credentials obtained, sending message...');

      // Create a SMTP transporter object
      let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
              user: account.user,
              pass: account.pass
          }
      });
  
      let message = {
        from: `Sender Name <${user}>`,
        to: arrEmail,
        subject: 'Nodemailer is unicode friendly ✔',
        text: `Emergency! ${location} ,${blobUrl}`,
        html: `<p>Emergency! ${location} ,${blobUrl}</p>`
      };
      transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            msg="Emails not sent";
            return 0;
        }
        else{
          statusCode=200;
          msg="Emails successfully sent";
          //console.log('Message sent: %s', info.messageId);
          urlofEmail=nodemailer.getTestMessageUrl(info);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          return 1;
        }  
      }); 
    }
    
  });
}
/* Send Emails with current location to emrgency emails*/
router.post('/locate', function(req, res, next) {
  console.log("send emails with location api called",req.body.location);
  arrEmail= req.body.arrEmail;
  user=req.body.email;
  location=req.body.location;
  //sendEmail();
  let result=sendEmail();
  if(result==0)
    res.status(statusCode).json({msg: msg});
  else  
    res.status(statusCode).json({msg: msg,urlofEmail:urlofEmail});
});

/* Send Emails with some video and audio recodings to emergency emails*/
router.post('/record', function(req, res, next) {
  console.log("send emails with recordings api called",req.body.data,req.body.blobUrl,req.body.dataUrl)
  arrEmail= req.body.arrEmail;
  user=req.body.email;
  blobUrl=req.body.blobUrl;
  let result=sendEmail();
  if(result==0)
    res.status(statusCode).json({msg: msg});
  else  
    res.status(statusCode).json({msg: msg,blobUrl:blobUrl,urlofEmail:urlofEmail});
});

/* Fetch Emergency emails from table EmergencyContacts*/
router.post('/', function(req, res, next) {
  const client1=new Client(config);
  client1.connect()
  console.log("fetch emails api called");
  const text = 'SELECT * from "SafetyWebapp"."EmergencyContacts" as "A" WHERE "A"."email"=$1 ';
  const values = [req.body.email]
  user=req.body.email;
  client1
  .query(text, values)
  .then(res => {
    //console.log(res.rows);
    if(res.rowCount!=0){
      res.rows.map( (obj) =>{
        arrEmail.push(obj["emrgMail"])
      })
      statusCode=200;
      msg="Sucessfully fetched emergency contacts";
    }
    else{
      msg="Cannot fetch emergency contacts";
    }
  })
  .catch((e) => {
    console.error(e.stack)
    msg="Cannot fetch emergency contacts";
  })
  .then(()=>{
    client1.end()
    res.status(statusCode).json({msg: msg, arrEmail: arrEmail});
  })
});

module.exports = router;
