import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import { Logo } from '../Utils.js'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
import { Redirect } from 'react-router-dom'
// import { updateDB } from '../store/actions/authActions'
// import { putDataToDB } from '../store/actions/authActions'
// import { getDataFromDB } from '../store/actions/authActions'

import { mapPropsStream } from 'recompose';

// Child of loginscreen
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
                first_name:'',
                last_name:'',
                email:'',
                password:''
               }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register.js handleSubmit this.state ',this.state)
    e.preventDefault();
    if(!this.state.first_name){
    alert('first name required')
      }else if (!this.state.last_name){
    alert('last name required')
      }else if (!this.state.email){
    alert('email required')
      }else if (!this.state.password){
    alert('password rquired')
      }else {
	    
    console.log('Register.js handleSubmit this.state ',this.state)
    this.props.signUp(this.state)
    }
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
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={{margin:'15px'}} onClick={(event) => this.handleSubmit(event)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    //authError: state.auth.authError
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);