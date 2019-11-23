import React from 'react';
//import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Reat, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './App.css';
import HomepageImage from './components/HomepageImage';
import Navbar from './components/Navbar.js';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: "GET"
    }).then(response => response.json()).then(posts => {
      console.log("posts", posts)
    });
  }

  render() {
    return (
      <p>Hello..!</p>
    );
  }
  
}

export default App;
