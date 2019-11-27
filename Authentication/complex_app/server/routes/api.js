import uuid from 'uuid';
import sha256 from 'sha256'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

// mongodb setting
import { MONGO_URL, USERS_COL, MONGO_DB_NAME } from './settings.js'
import MongoDbHelper from './MongoDbHelper';
let mongoDbHelper = new MongoDbHelper(MONGO_URL);

const API_KEY = '__api_key__'

// start connection
mongoDbHelper.start(MONGO_DB_NAME, () => {
  console.log("mongodb ready")
});

// generate random string
function makeid (count) {
  if (!count){
    count = 5;
  }

  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < count; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// index
exports.echo = (req, res) => {

  const { login_token } = req.session

  res.json({
    status: 'OK',
    login_token: login_token
  });
}

// ************** CREATE USER CREDENTIALS **************
exports.create_user = (req, res) => {
  // (1) ---------------------------------
  //  Receive email id and password
  let password =  req.body.password;
  let email =  req.body.email;
  // (1) ---------------------------------
  let api_key =  req.headers.authorization
  
  if (api_key !== API_KEY){
    res.json({ status: 'error', detail: 'api key is invalid' });
    return;
  }
  
  let user_info = {}
  let login_token
  
  let find_param = {
    'emails.address':email
  }
  mongoDbHelper.collection(USERS_COL).count(find_param)
  .then((results) => {
    return new Promise((resolve, reject) => {
      if (results != 0){
        reject("user already exist")
      }
      resolve()
    })
  })
  .then(() => {
    // (2) ---------------------------------
    //  Create hashes
    //    bcrypt of password
    let password2 = sha256(password)
    var bcrypt_hash = bcrypt.hashSync(password2, 10);
    // (2) ---------------------------------
    
    // (3) ---------------------------------
    //  Create login token which we return to client
    //    maybe using uuid is better...
    //    login token which to use login
    login_token = makeid('4') + parseInt(new Date().getTime()).toString(36);
    // (3) ---------------------------------
    
    // (4) ---------------------------------
    //  Create hash of login_token which is stored in mongo
    const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');
    // (4) ---------------------------------
    
    // (5) ---------------------------------
    //  We keep hashed tokens to use at the signin
    const token_object = {
      'when':new Date(),
      'hashedToken':hashed_token,
    };
    // (5) ---------------------------------
    
    // (6) ---------------------------------
    //  Create json and insert into mongodb
    let insert_params = {
      createdAt: new Date(),
      services:{
        password : {
          bcrypt : bcrypt_hash
        },
        resume : {
          loginTokens : [token_object]
        },
        email : {
          verificationTokens : [
          {
            // nameHash : nameHash,
            address : email,
            when : new Date(),
          }
          ]
        },
      },
      emails : [
      {
        "address" : email,
        "verified" : false
      }
      ],
      profile : {},
    }
    // (6) ---------------------------------
    
    // (7) ---------------------------------
    //  Insert user info into MongoDB
    return mongoDbHelper.collection(USERS_COL).insert(insert_params)
    // (7) ---------------------------------
  })
  .then((results) => {

    if ( results === null ) {
      res.json({ status: 'error', detail: 'no such user' });
      return;
    }

    user_info._id = results._id;
    user_info.profile = results.profile;

    // req.session.userId = user_info._id
    req.session.login_token = login_token // maybe not necessary

    res.json({
      status: 'success',
      user: user_info,
      login_token: login_token,
    })

  })
  .catch((err) => {
    res.json({ status: 'error', detail: err });
  })
}

// ************** SIGN-IN PROCESS HERE **************
// login with email and password
exports.login_with_email_password = (req, res) => {

  let password =  req.body.password;
  let email =  req.body.email;
  let api_key =  req.headers.authorization

  if (api_key !== API_KEY){
    res.json({ status: 'error', detail: 'api key is invalid 2' });
    return;
  }

  let find_param = {
    'emails.address':email
  }

  let user_info = {};
  let login_token

  // insert
  mongoDbHelper.collection(USERS_COL).findOne(find_param)
  .then((results) => {
    // check password

    return new Promise( (resolve, reject) => {

      if (!results){
        reject("no such user")
      }
      if (!results.services || !results.services.password || !results.services.password.bcrypt){
        reject("something must be wrong")
      }

      // set user info
      user_info._id = results._id;
      user_info.profile = results.profile;

      let password2 = sha256(password)

      const saved_hash = results.services.password.bcrypt

      bcrypt.compare(password2, saved_hash, (err, res) => {
        if (err){
          reject(err)
        }

        if (res === true){
          resolve()
        } else {
          reject("password is not valid")
        }
      });
    } )
  })
  .then(() => {
    // issue token

    let find_param = {
      _id: user_info._id
    }

    // login token
    login_token = makeid('4') + parseInt(new Date().getTime()).toString(36);
    const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');

    const token_object = {
      'when':new Date(),
      'hashedToken':hashed_token,
    };

    let upd_param = {
      '$push':{
        'services.resume.loginTokens':token_object
      }
    };

    // update
    return mongoDbHelper.collection(USERS_COL).update(find_param, upd_param)
  })
  .then((results) => {

    // set session
    req.session.login_token

    res.json({
      status: 'success',
      user: user_info,
      login_token: login_token,
    })

  })
  .catch((err) => {
    res.json({status: 'error', detail: err})
  })
}

// logout
exports.logout = (req, res) => {

  // let login_token = req.body.login_token;
  let login_token = req.session.login_token;
  if (!login_token){
    // user is not login
    res.json({status: 'success'})
    return;
  }

  let api_key =  req.headers.authorization


  if (api_key !== API_KEY){
    res.json({ status: 'error', detail: 'api key is invalid' });
    return;
  }
  // (1) ---------------------------------
  //  Create hash from login token
  const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');
  // (1) ---------------------------------

  // (2) ---------------------------------
  //  Find user with elemMatch
  let find_param = {
    'services.resume.loginTokens':{
      '$elemMatch':{
        'hashedToken':hashed_token
      }
    }
  }
  // (2) ---------------------------------

  // (3) ---------------------------------
  // Find user credentials in MongoDB
  mongoDbHelper.collection(USERS_COL).findOne(find_param)
  .then((results) => {

  if (results === null){
      return Promise.reject("no such token")
  }
  
  let find_param = {
    '_id':results._id
  };
  var upd_param = {
    '$pull':{
      'services.resume.loginTokens':{
        'type':'ios'
      }
    }
  };
  return mongoDbHelper.collection(USERS_COL).update(find_param, upd_param)
  })
  .then(() => {
  return new Promise((resolve, reject) => {})
  req.session.destroy((err) => {
    if (err) {
      reject(err)
    }
    resolve()
  })
  })
  .then(() => {
    res.json({status: 'success'})
  })
  .catch((err) => {
     res.json({status: 'error', detail: err})
  })
  // (3) ---------------------------------
}

// login_with_token
exports.login_with_token = (req, res) => {

  let login_token =  req.body.login_token;
  let api_key =  req.headers.authorization

  if (api_key !== API_KEY){
    res.json({ status: 'error', detail: 'api key is invalid' });
    return;
  }

  let user_info = {};

  const hashed_token = crypto.createHash('sha256').update(login_token).digest('base64');
  let find_param = {
    'services.resume.loginTokens':{
      '$elemMatch':{
        'hashedToken':hashed_token
      }
    }
  }

  // find user
  mongoDbHelper.collection(USERS_COL).findOne(find_param)
  .then((results) => {
    // set user info

    if ( results === null ) {
      res.json({ status: 'error', detail: 'no such user' });
      return;
    }

    user_info._id = results._id;
    user_info.profile = results.profile;

    // set session
    req.session.login_token

    // return success
    res.json({
      status: 'success',
      user: user_info,
      login_token: login_token,
    })
  })
  .catch((err) => {
    res.json({status: 'error', detail: err})
    console.log("err:", err)
  })
}
