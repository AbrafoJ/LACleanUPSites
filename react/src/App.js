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
import LogInApp from './components/LoginApp'
import Favorites from './components/Favorites'
import MasterBoard from './components/MasterBoard'

//log in
import Loginscreen from '/Users/flo/Desktop/491/testReact/testapp/src/components/Loginscreen.js';
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
    //const {data} = this.state; 
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
             <Route exact path="/" component={Dashboard} />
             <Route path="/login" component={LogInApp} />
             <Route path="/main" component={MasterBoard} />
             <Route path="/favorites" component={Favorites} />   
             <Route component={NotFound} />   
          </Switch>
          {/* <div className="appbar">
            <MuiThemeProvider>
            <AppBar style={{ background: '#636363',width:"84%",margin:"auto" }}/>
            </MuiThemeProvider>
          </div> */}

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
