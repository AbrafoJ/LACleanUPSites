import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import HomepageImage from './components/HomepageImage';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <div className="App">
      <header className= "Navbar-Header">
	<Navbar />
      </header>
      <header className="App-header">
	<HomepageImage />
        <p>
		My first react Site
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
