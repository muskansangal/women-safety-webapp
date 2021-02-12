const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const config=require('./Connection');
// const client=new Client(config);

let statusCode=200,msg="";

/* Add emergency contact detials of user in table EmergencyContacts of database */
router.post('/add', function(req, res, next) {
  const client=new Client(config);
  client.connect()
  const text = 'INSERT into "SafetyWebapp"."EmergencyContacts" values($1,$2,$3,$4,$5)';
  const values = [req.body.email,req.body.emrgMail,req.body.emrgContact,req.body.relationship,req.body.nameofEC];
  //console.log(req.body.email,req.body.emrgMail,req.body.emrgContact,req.body.relationship,req.body.nameofEC)
  client
  .query(text, values)
  .then(res => {
    console.log(res);
    if(res.rowCount!=0){
      statusCode=200;
      msg="Sucessfully added";
    }
    else{
      msg="Not added";
    }
  })
  .catch((e) => {
    console.error(e.stack)
    msg="Not added";
  })
  .then(()=>{
    client.end()
    res.status(statusCode).json({msg: msg});
  })
});

/* Confirming details of user in table UserDetails of database */
router.post('/check', function(req, res, next) {
  const client=new Client(config);
  client.connect()
  const text = 'Select * from "SafetyWebapp"."UserDetails" as "A" WHERE "A"."email"=$1';
  const values = [req.body.email];
  client
  .query(text, values)
  .then(res => {
    //console.log(res.rows,res.rows[0].password,req.body.password);
    if(res.rowCount!=0 && res.rows[0].email==req.body.email && res.rows[0].password==req.body.password){
      statusCode=200;
      msg="Login successful";
    }
    else{
      msg="Login not successful";
    }
  })
  .catch((e) => {
    console.error(e.stack)
    msg='Login not successful';
  })
  .then(()=>{
    client.end()
    res.status(statusCode).json({msg: msg});
  })
});

/* Registration of user:Adding details of user in table UserDetails of database */
router.post('/', function(req, res, next) {
  const client=new Client(config);
  client.connect()
  const text = 'INSERT into "SafetyWebapp"."UserDetails" values($1,$2,$3,$4,$5,$6)';
  const values = [req.body.email,req.body.firstName,req.body.lastName,req.body.password,req.body.contact,"random"];
  client
  .query(text, values)
  .then(res => {
    console.log(res);
    if(res.rowCount!=0){
      statusCode=200;
      msg="Sucessfully registered";
    }
    else{
      msg="Not registered";
    }
  })
  .catch((e) => {
    console.error(e.stack)
    msg='Not registered';
  })
  .then(()=>{
    client.end()
    res.status(statusCode).json({msg: msg});
  })
});

module.exports = router;
// {
// 	"email": "herald@mail.com"
// 	"emrgMail": "emergencycontact@example.com"
// 	"emrgContact": "1234567890"
// 	"relationship": "Mother"
// 	"nameofEC": "rama"
// }