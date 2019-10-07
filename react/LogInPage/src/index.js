import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactDOM from 'react-dom';
import './index.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class LogIn extends React.Component {
	constructor(props){
		super(props);
		this.state = {  // defines object and its var
			username: '',
			password: ''
		}
	}

	 certification(username, pass){
		if (username === 'admin' && pass === 'pass'){
			console.log('log in succesful');
		 	return true;
		} else return false;
	 }
	
	render(){
		return (//tells what to show in the wb
			<div>
			  <MuiThemeProvider>
		  
				<TextField //text field
					hintText = "Enter your Username"
					floatingLabelText = "Username"
					onChange = { (event, newValue) => this.setState( {username:newValue})}
				/>
			  	 
				<br/>
				 
					<TextField 
						type="password"
						hintText = "Enter your password"
						floatingLabelText="Password"
						onChange = { (event, newValue) => this.setState({password:newValue})}
					/>
				 
			 	<br/>
				<br/>
			
		

					<RaisedButton label = "logIn" primary={true} style = {style} onClick={() => this.certification(this.username,this.password)}/>
					<RaisedButton label = "SignUp" primary={true} style = {style} onClick={(event) => this.handleClick(event)}/>
				
				<br/>
			    
			 </MuiThemeProvider>
			</div>
		);
	}
	
}


//=====================================================
const style = {
	margin: 15,
};
//==================================================================================================

ReactDOM.render(<LogIn />, document.getElementById("root"));
