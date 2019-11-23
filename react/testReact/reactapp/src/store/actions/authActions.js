

export const signIn = (credentials) => {
    return (dispatch, getState) => {
     
        console.log('hi',credentials)
        // AUTHENTICATION MAGIC HAPPENS HERE
        // FOR NOW I JUST SET EVERYTHING TO SUCCESS
        dispatch({ type: 'LOGIN_SUCCESS' });

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