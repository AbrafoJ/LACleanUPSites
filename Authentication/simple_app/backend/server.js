// /backend/server.js
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb://localhost:27017/test';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err,data)=> {
    //console.log('HELOL',data)
    if(err) return res.json({success:false,error:err});
    return res.json(data);
  })
});

router.post('/signIn', (req, res) => {
  let data = new Data();
  const { id, user } = req.body;
  
  console.log("username",user)

  
  Data.findOne({'username': user},'username salt',(err,data)=> {
    console.log('HELOL',data)

    if(err) return res.json({success:false,error:err});

    if( !data ) return res.json({success:false,error:err});
    if (user === data.username){
      console.log("USER NAME EXISTS< SENDING BACK SALT")
      console.log("server salt",data.salt)
      return res.json(data.salt);
    }else{
      return res.json({success:false,error:err})
    }
    // }catch(err){
    //   console.log("post/signIn",err)
    //   return res.json({success:false,error:err})
    // }
  });
});

router.post('/checkHash', (req, res) => {
    let data = new Data();
    const { id, user, hashed_psswd } = req.body;
    
    Data.findOne({'username': user},'username hashed_psswd first_name last_name',(err,data)=> { 
      //console.log('HELOL',data.username)
      if(err) return res.json({success:false,error:err});
      // return success if hashes match
      if( !data ) return res.json({success:false,error:err});
      if(user === data.username && hashed_psswd === data.hashed_psswd){     
        console.log("server likes the hashes")
        return res.json({ success: true, first_name:data.first_name, last_name:data.last_name }); 
      }
      else{
        console.log("userhash",hashed_psswd)
        console.log("serverhash",data.hashed_psswd)
        console.log("server says hashes dont match")
        return res.json({success:false,error:err}) 
      }
      // }catch(err){
      //   console.log("post/checkHash",err)
      //   return res.json({success:false,error:err})
      // }
    })

});


// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, first_name, last_name, username, salt, hashed_psswd } = req.body;
  console.log('first_name', first_name)
  console.log('last_name', last_name)
  console.log('username',username)
  console.log('hashed_psswd',hashed_psswd)
  Data.findOne({username}, function(err, obj){
    if(err) console.log(err);
    //data exists; send back error
    if(obj){
      return res.json({
        success: false,
        error: 'DUPLICATE USERNAME',
      });
    //we good
    }else{
      console.log("new user")
      data.first_name = first_name;
      data.last_name = last_name;
      data.salt = salt;
      data.hashed_psswd = hashed_psswd;
      data.username = username;
      data.id = id;
      data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        
        return res.json({ success: true, first_name:data.first_name, last_name:data.last_name }); 
      });
    }
  })
  //alert('server')
  // if ((!id && id !== 0) || !username || !salt || !hashed_psswd) {
  //   return res.json({
  //     success: false,
  //     error: 'INVALID INPUTS',
  //   });
  // }
  // data.salt = salt;
  // data.hashed_psswd = hashed_psswd;
  // data.username = username;
  // data.id = id;
  // data.save((err) => {
  //   if (err) return res.json({ success: false, error: err });
    
  //   return res.json({ success: true });
  // });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
