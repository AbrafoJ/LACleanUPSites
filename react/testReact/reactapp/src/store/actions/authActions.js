// /client/App.js

import React, { Component } from "react";
import axios from 'axios';
//import Mongo from '../../components/mongo'

// Required for password hashing
import crypto from 'crypto';
// ------------------------------------------------------------------------------
// *** PASSWORD HASHING ***

// Salts the password so the same pasword given by two different users 
//		wont go to the same hash value.
export const genRandomString = function(length){                                                                                                                                                                                        return crypto.randomBytes(Math.ceil(length/2))
	.toString('hex') /** convert to hexadecimal format */
	.slice(0,length);   /** return required number of characters */
};


// cryptographic  hash for  the user password using sha 512 to protect 
//		the users password.
// That way enemy can't get the user's password.
export const sha512 = function(password, salt){
	var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
	hash.update(password);
	var value = hash.digest('hex');
	return {
		salt:salt,
		passwordHash:value
	};
};
let currentIds = 0;
var data = []
// ------------------------------------------------------------------------------
export const getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ 
          data: res.data
        }));
  };

    // our put method that uses our backend api
  // to create new query into our data base
export const putDataToDB = (salt,hashed_psswd,username) => {
    // let currentIds = this.state.data.map((data) => data.id);
    // let idToBeAdded = 0;
    // while (currentIds.includes(idToBeAdded)) {
    //   ++idToBeAdded;
    // }

    console.log('SALT and HASH' , salt, hashed_psswd )
    axios.post('http://localhost:3001/api/putData', {
      id: 0,
      username: username,
      salt: salt,
      hashed_psswd: hashed_psswd,
    });
    
    // .then(function(data) {
    //     console.log('putdatatodb',data)
    //     //console.log('putdatatodb',response.username)
    // });
    //getData();
    //console.log('getData',getData());
  };

  // our delete method that uses our backend api
  // to remove existing database information
export const deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

//   // our update method that uses our backend api
//   // to overwrite existing data base information
//   export const updateDB = (idToUpdate, updateToApply) => {
//     let objIdToUpdate = null;
//     parseInt(idToUpdate);
//     this.state.data.forEach((dat) => {
//       if (dat.id == idToUpdate) {
//         objIdToUpdate = dat._id;
//       }
//     });

//     axios.post('http://localhost:3001/api/updateData', {
//       id: objIdToUpdate,
//       update: { message: updateToApply },
//     });
//   };

export const signUp = (newUser) => {
    console.log('authActions signUp newUser: ',newUser)

    return (dispatch, getState) => {
        console.log('authActions getState',getState)
        //const mong = 
        const username = newUser['email'];
        const salt = genRandomString(16);
        const hash = sha512(username,salt).passwordHash 
        //console.log("salt",salt)
        //console.log("newUser",newUser['email'])
        //console.log('SALT and HASH' , salt, sha512(email,salt).passwordHash )
        putDataToDB( salt,  hash, username )


        
        dispatch({ type: 'REG_SUCCESS' });
        //ELSE REG_FAIL
    }
}

export const signIn = (credentials) => {
    return (dispatch, getState) => {
     
        console.log('authActions signIn credentials',credentials)
        // AUTHENTICATION MAGIC HAPPENS HERE
        // FOR NOW I JUST SET EVERYTHING TO SUCCESS
        dispatch({ type: 'LOGIN_SUCCESS' });
        //else LOGIN_ERROR

    }
}

export const signOut = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
    }
}


//   var apiBaseUrl = "http://localhost:4000/api/";
//   var payload={
//                 "email":this.state.username,
//                 "password":this.state.password
//               }
  
//   axios.post(apiBaseUrl+'login', payload).then(function (response) {
//     console.log(response);

//     //what does 200 and 204 mean? i assume it went to the DB to check
//     if(response.data.code == 200){
//       console.log("Login success");

//       var uploadScreen = [];
//       uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
//       self.props.appContext.setState({
//                                       loginPage:[],
//                                       uploadScreen: uploadScreen
//                                     })
//     }
//     else if(response.data.code == 204){
//       console.log("Username and password do not match");
//       alert("Username password do not match")
//     }
//     else{
//       console.log("Username does not exist");
//       alert("Username does not exist");
//     }
//   }).catch(function (error) {
//     console.log(error);
//   });

// var apiBaseUrl = "http://localhost:4000/api/";
// console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
// //To be done:check for empty values before hitting submit
// var self = this;
// var payload = {
//               "first_name": this.state.first_name,
//               "last_name":this.state.last_name,
//               "email":this.state.email,
//               "password":this.state.password
//               }

// axios.post(apiBaseUrl+'/register', payload)

// .then(function (response) {
//  console.log(response);
//  if(response.data.code == 200){
//   //  console.log("registration successfull");
//    var loginscreen = [];

//    loginscreen.push(<Login parentContext={this}/>);

//    //var loginmessage = "Not Registered yet. Go to registration";
//    var loginmessage = "register.js";

//    self.props.parentContext.setState({
//                                       loginscreen:loginscreen,
//                                       loginmessage:loginmessage,
//                                       buttonLabel:"Register",
//                                       isLogin:true
//                                     });
//  }
// })
// .catch(function (error) {
//  console.log(error);
// });