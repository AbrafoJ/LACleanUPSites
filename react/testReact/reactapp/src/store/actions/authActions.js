// /client/App.js

import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Router } from 'react-router-dom'
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
//export const path = 
export const getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then(function(data){
        console.log("HEY",data);

        
      }).catch((error)=>{
        console.log('getDataToDB error',error)
      }); 
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
// var arr_of_favs = []
// export const getFavorites = (cred) => {
//   axios.post('http://localhost:4200/favorites' , {
//     user: cred.username
//   }).then((res)=>{
//     console.log("client favorites",res);
//     arr_of_favs = res;
//   });
// }

export const signUp = (newUser) => {
    console.log('authActions signUp newUser: ',newUser)
    return (dispatch, getState) => {
        console.log('authActions getState',getState)
        const first_name = newUser['first_name'];
        const last_name = newUser['last_name'];
        const username = newUser['email']; //refering to email as username from now on.
        const salt = genRandomString(16);

        // change this
        const hashed_psswd = sha512( newUser.password , salt ).passwordHash 
        axios.post('http://localhost:3001/api/putData', {
          id: 0,
          first_name: first_name,
          last_name: last_name,
          username: username,
          salt: salt,
          hashed_psswd: hashed_psswd,
        }).then(function(res){
          var status = res.data['success'];
          if(status) {
            dispatch({ type: 'REG_SUCCESS' , first_name:res.data['first_name'], last_name:res.data['last_name']}); 
          } else {
            dispatch({ type: 'REG_ERROR' });
          }
          return res
        }).catch((error)=>{
          console.log('putDataToDB error',error)
        });
    }
}

export const signIn = (credentials) => {
    return (dispatch, getState) => {
        //console.log('authActions signIn credentials',credentials)
        // credentials = {username: "", password"""}
        //console.log('I AM HERE',credentials)
        // fetch('http://localhost:3001/api/getData')
        // .then((data) => data.json())
        // .then((res) => this.setState({ 
        //     data: res.data
        // }));

        axios.post('http://localhost:3001/api/signIn', {
          id: 1,
          user: credentials.username
        }).then((res)=>{
          // i got back salt, hash it, send it back to server
          // with the username (server compares it with its username in mongo)
          //console.log("I GOT SALT",res.data)
          var hashed_psswd = sha512(credentials.password,res.data).passwordHash 

          axios.post('http://localhost:3001/api/checkHash', {
            id: 2,
            user: credentials.username,
            hashed_psswd: hashed_psswd
          }).then(function(res){
            var first_name = res.data['first_name'];
            var last_name = res.data['last_name']

            //console.log('client side has verified salt',res.data)
            if(res.data.success){
              //var fav_arr = []
              //================================================================
              axios.post('http://localhost:4200/favorites' , {
                user: credentials.username
              }).then((res)=>{
                //console.log("client favorites",res);
                //fav_arr = res;
                dispatch({ type: 'LOGIN_SUCCESS' , first_name, last_name, favs:res.data['favorites'] }); 
              });
              //================================================================
              //dispatch({ type: 'LOGIN_SUCCESS' , first_name:res.data['first_name'], last_name:res.data['last_name'], favs:fav_arr }); 
            }
            else{
              alert('Invalid username or password.')
              dispatch({ type: 'LOGIN_ERROR'})
            }
          })
        }).catch((err)=> {
           alert(err)
           dispatch({ type: 'LOGIN_ERROR'})
           //console.log('signin',err)
        });


        // fetch('http://localhost:3001/api/getData')
        // .then(function(data){
        //   console.log("HEY",data);
          
          
        // }).catch((error)=>{
        //   console.log('putDataToDB error',error)
        // }); 
        // //axios.get('http://localhost:3001/api/getData')
        // axios.get('http://localhost:3001/api/getData')
        // .then(response => {
        //   console.log(response.data);
        // }, error => {
        //   console.log(error);
        // });
        //dispatch({ type: 'LOGIN_SUCCESS' });
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
