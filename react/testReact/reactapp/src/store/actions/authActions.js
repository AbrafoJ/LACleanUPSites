

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

export const signUp = (newUser) => {
    console.log('authActions signUp newUser: ',newUser)
    return (dispatch, getState) => {
        dispatch({ type: 'REG_SUCCESS' });
        //ELSE REG_FAIL
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