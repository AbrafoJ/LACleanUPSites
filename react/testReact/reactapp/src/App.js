//=======================================================================
// IMPORTS
//=======================================================================
// React
import React from 'react';
import './App.css';
//import axios from 'axios';

// ReactTable
//import "react-table/react-table.css";

// Header, Footer
import { Route, Switch, BrowserRouter } from 'react-router-dom'

// COMPONENTS
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './components/Navbar'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard'
import LoginPage from './components/LoginPage'
import Favorites from './components/Favorites'
import MasterBoard from './components/MasterBoard'

//log in
import Loginscreen from './components/Loginscreen.js';
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
class App extends React.Component{
  //----------------------------------------------------------------------
  // render(): displays image on the UI as a component
  //
  // columns: listing, address, sale price, contaminant (tentative)
  // so we need to convert our listings to json objects
  // accessor is the key to each object
  //----------------------------------------------------------------------
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
             <Route exact path="/" component={Dashboard} />
             <Route path="/reload" component={null} key="reload" />
             <Route path="/login" component={LoginPage} />
             <Route path="/main" component={MasterBoard} />
             <Route path="/favorites" component={Favorites} />   
             <Route component={NotFound} />   
          </Switch>


        </div>
      </BrowserRouter>
    );
  }
}

export default App;
