import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NotFound from './components/NotFound'
import Archive from './components/Archive'
import Favorites from './components/Favorites'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';


const routing = (
    <Router>
        <div className="container">
            <ul id="nav">
            {/* <li><Link to='/' className=''></Link></li> */}
            <li><Link to="/" className=''>Home</Link></li>
            <li><Link to="/favorites" className=''>Favorites</Link></li>
            <li><Link to="/archive" className=''>Archive</Link></li>
            
            
            {/* <li><a href="#">Favorites</a></li>
            <li><a href="#">Deleted</a></li> */}
            </ul>
        </div>
      <div>
          <Switch>
             <Route exact path="/" component={App} />
             <Route path="/favorites" component={Favorites} />   
             <Route path="/archive" component={Archive} />  
             <Route component={NotFound} />   
          </Switch>
      </div>
    </Router>
  )


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
