import React,{ useState }  from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Bootstrap from "react-bootstrap";
import ReactDOM from 'react-dom';
import './index.css';



class LogIn extends React.Component {

	 constructor(props) {
		         super(props);

		         this.state = {
			      username: "",
			      password: ""
				         };
		       }
	 
	
	sayLogInSuc(){
		if (this.state.username === 'admin' && this.state.password === 'mom') alert('log in succesfull');
		else alert('log in failed');
	 }

	 validateForm() {
		 return this.state.username.length > 0 && this.state.password.length > 0;
		        }

	 handleChange = event => {
		  this.setState({
			[event.target.id]: event.target.value
				              });
		            }

	 handleSubmit = event => {
		   event.preventDefault();
		            }

	 render() {
		       return (
				    <div>
				      <Form onSubmit={this.handleSubmit}>
				        Username 
			       		<Form.Group controlId="username" bsSize="large">
				             <Form.Control
				                        autoFocus
				                        type="username"
				                        value={this.state.username}
				                        onChange={this.handleChange}
				                        style = {{width: '100%'}}
			       			/>
			       		
				              </Form.Group>
			       		 Password
				         <Form.Group controlId="password" bsSize="large">
				              <Form.Control
				                        value={this.state.password}
				                        onChange={this.handleChange}
				                        type="password"
			       				style = {{width:'100%'}} 
				                      />
				                    </Form.Group>
				                    
			       			    <Button
				                      block
				                      bsSize="large"
				                      disabled={!this.validateForm()}
			       			      onClick = {this.sayLogInSuc.bind(this)}
				                      type="submit"
				                    >
				                      Login
				                    </Button>
				                  </Form>
				                </div>
				              );
		            }
	    }
//=====================================================



//==================================================================================================

ReactDOM.render(<LogIn />, document.getElementById("root"));
