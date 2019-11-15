//=======================================================================
// IMPORTS
//=======================================================================
// React
import React from 'react';
import { Component } from 'react';
import './App.css';

// ReactTable
import ReactTable from "react-table";
import "react-table/react-table.css";

// Export to Excel
import ExportToExcel from "./ExportToExcel"


//Misc stuff Jordan is messing with
//import HomepageImage from './components/HomepageImage';
//import Navbar from './components/Navbar.js';
//=======================================================================

const path = "http://ec2-52-33-84-204.us-west-2.compute.amazonaws.com:3000/Flo";
const test_path = "https://jsonplaceholder.typicode.com/posts"
// var myInit = { 
//   method: 'GET',
//   headers: {'Content-Type':'application/json'},
//   mode: 'no-cors',
//   cache: 'default'
// };

//**********************************************************************/
// APP CLASS
// 
// this is how our table is generated in the interface
// using ReactTable pretty much magic
// 1. fetch data from address (address contains json objects)
// 2. render data into columns
//**********************************************************************/
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

  //----------------------------------------------------------------------
  // componentDidMount()
  // fetch data from address and store it into component
  //----------------------------------------------------------------------
  componentDidMount(){
    // this link will be replaced with our data
    // const url = "https://jsonplaceholder.typicode.com/posts"
    // fetch(url, {
    //   method: "GET"
    // }).then(response => response.json()).then(posts =>{
    //   this.setState({posts: posts})
    // })
    fetch(path,{
      method: "GET"
    })
    .then(response => {
      return response.json(); //return the promise
    })
    .then(posts => {
      this.setState({posts: posts});
      console.log(this.state.posts)
      //console.log('Posted? Whatever the fuck this means')
    })
    .catch(err => {
      console.log('error: ',err.message);
    });
  }

  //----------------------------------------------------------------------
  // deleteRow() 
  // input: takes an id to the array corresponding to a row
  // after delete button is clicked, row is deleted
  // pre-cond: address exists in user's database
  // post-cond: address is deleted from user's database, not master database
  //----------------------------------------------------------------------
  deleteRow(id){
    const index = this.state.posts.findIndex(post => {
      return post.id === id;
    })
    // once delete button is clicked, remove from table
    console.log(index)
    this.state.posts.splice(index, 1);
    this.setState({posts: this.state.posts});
  }

  //----------------------------------------------------------------------
  // bookMarkRow() 
  // input: takes an id to the array corresponding to a row
  // after booknmark button is clicked, row is bookmarked to user account
  // pre-cond: address exists in user's database
  // post-cond: address is saved in user's database, not master database
  //----------------------------------------------------------------------
  bookmarkRow(id){
    const index = this.state.posts.findIndex(post => {
      return post.id === id;
    })
    console.log(index)
    // once delete button is clicked, remove from table
    //this.state.posts.splice(index, 1);
    //this.setState({posts: this.state.posts});
  }

  //----------------------------------------------------------------------
  // render(): displays image on the UI as a component
  //
  // columns: listing, address, sale price, contaminant (tentative)
  // so we need to convert our listings to json objects
  // accessor is the key to each object
  //----------------------------------------------------------------------
  render() {
    const columns = [
      // column 4
      {
        Header: "Property ID",
        style:{
          textAlign:"right"
        },
        width: 80,
        maxWidth: 80,
        minWidth: 80,
        sortable: false,
        filterable: false,

        Cell: props =>{
          return(
            <button style ={ {backgroundColor:"orange", color:"#fefefe"}}
                              onClick={() => {
                                this.bookmarkRow(props.original.id);
                              }}
            >Bookmark</button>
          )
        }
      },
      // column 1
      {
        Header: "Property ID",
        accessor: "Street #",
        style:{
          textAlign: "left"
        },
        width: 200,
        maxWidth: 200,
        minWidth: 200
      },

      // column 2
      {
        Header: "Property Address",
        accessor: "Street Name",
        style:{
          textAlign: "left"
        },
        width: 300,
        maxWidth: 300,
        minWidth: 300
      },

      // column 3
      {
        Header: "Sale Price",
        accessor: "ZIP Code",
        style:{
          textAlign:"left"
        },
        width: 150,
        maxWidth: 200,
        minWidth: 200
      },

      // column 4
      {
        Header: "Property ID",
        style:{
          textAlign:"right"
        },
        width: 60,
        maxWidth: 60,
        minWidth: 60,
        sortable: false,
        filterable: false,

        // delete button
        Cell: props =>{
          return(
            <button style ={ {backgroundColor:"red", color:"#fefefe"}}
                              onClick={() => {
                                this.deleteRow(props.original.id);
                              }}
            >Delete</button>
          )
        }
      }
    ]

    // return ReactTable object
    return (
      <ReactTable
        columns={columns}
        data={this.state.posts}
        filterable
        defaultPageSize = {20}
        //noDataText={"whatever"}
        //showPagination={false}
        >
        { //export react data to excel sheet
          (state, filteredData, instance) => 
            {
              this.reactTable = state.pageRows.map(post => { return post._original });
              return(
                    <div>
                      {filteredData()}
                      <ExportToExcel posts={this.reactTable}/>
                    </div>
                    )
            }
        }
       </ReactTable>
    );
  }
}

export default App;
