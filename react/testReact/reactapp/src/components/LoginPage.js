//=======================================================================
// IMPORTS
//=======================================================================
// React
import React from 'react';
import './LoginPage.css';
//import axios from 'axios';

// ReactTable
//import ReactTable from "react-table";
//import "react-table/react-table.css";

// Header, Footer
//import { Authors, Logo, GitHubLink } from "./Utils";
//import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

//import NavBar from './components/Navbar'
//import './components/Navbar.css';

//log in
import Loginscreen from '../components/Loginscreen.js';
//=======================================================================

//const path = "http://ec2-52-33-84-204.us-west-2.compute.amazonaws.com:4200";
const path = "http://44.227.157.207:4200"; // to MongoDB

//**********************************************************************/
// APP CLASS
// 
// this is how our table is generated in the interface
// using ReactTable pretty much magic
// 1. fetch data from address (address contains json objects)
// 2. render data into columns
//**********************************************************************/
class LogInPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loginPage:[],
      uploadScreen:[]
      //data: []
    }
  }

  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }

  //----------------------------------------------------------------------
  // render(): displays image on the UI as a component
  //
  // columns: listing, address, sale price, contaminant (tentative)
  // so we need to convert our listings to json objects
  // accessor is the key to each object
  //----------------------------------------------------------------------
  render(){
    const {data} = this.state; 
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.uploadScreen}
      </div>
      //<Logo/>
    );
  }
}
const style = {
  margin: 15,
};
export default LogInPage;
