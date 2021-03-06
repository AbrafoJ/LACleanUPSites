import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import UploadPage from './UploadPage';
import UploadScreen from './UploadScreen';
import { Logo } from '../Utils.js'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import { Redirect } from 'react-router-dom'

// Child of loginscreen
class Login extends Component {
constructor(props){
    super(props);
    this.state = {
                  username:'',
                  password:''
                }
 }

 handleClick(event){
   //event.preventDefault();
   //console.log('login',this.state)
   this.props.signIn(this.state)
 }

render() {
    const { auth } = this.props;
    if (auth['auth']) return <Redirect to='/main' />

    return (
      <div>
        <MuiThemeProvider>
          <div>
           <Logo />
           <TextField
             hintText = "Enter Email"
             floatingLabelText = "Email"
             onChange = {( event, newValue ) => this.setState({ username: newValue })}
             />
           <br/>
             <TextField
               type = "password"
               hintText = "Enter Password"
               floatingLabelText = "Password"
               onChange = {( event, newValue ) => this.setState({ password: newValue })}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={{margin:'15px'}} onClick={(event) => this.handleClick(event)}/>
             {/* <div className="red-text center">
                
                { authError ? <p>{authError}</p> : null} 
             </div> */}
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);