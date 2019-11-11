// React
import React from 'react';
import { Component } from 'react';
import './App.css';

// ReactTable
import ReactTable from "react-table";
import "react-table/react-table.css";

// Export to Excel
import ExportToExcel from "./ExportToExcel"

import HomepageImage from './components/HomepageImage';
import Navbar from './components/Navbar.js';


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
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: "GET"
    }).then(response => response.json()).then(posts => {
      this.setState({posts: posts})
    });
  }

  //----------------------------------------------------------------------
  // deleteRow() 
  // input: takes an id to the array coresponding to a row
  // after delete button is clicked, row is deleted
  //----------------------------------------------------------------------
  deleteRow(id){
    const index = this.state.posts.findIndex(post => {
      return post.id === id;
    })
    // once delete button is clicked, remove from table
    this.state.posts.splice(index, 1);
    this.setState({posts: this.state.posts});
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

      // column 1
      {
        Header: "Property Listing",
        accessor: "userId",
        style:{
          textAlign: "center"
        },
        width: 200,
        maxWidth: 200,
        minWidth: 200
      },

      // column 1
      {
        Header: "Property Address",
        accessor: "id",
        style:{
          textAlign: "center"
        },
        width: 300,
        maxWidth: 300,
        minWidth: 300
      },

      // column 2
      {
        Header: "Other",
        accessor: "title"
      },

      // column 3
      {
        Header: "Sale Price",
        accessor: "title",
        sortable: false,
        filterable: false,
        width: 150,
        maxWidth: 200,
        minWidth: 200
      },

      // column 4
      {
        Header: "Description",
        accessor: "body",
        sortable: false,
        filterable: false
      }
      ,

      // column 5
      {
        Header: "Actions",
        style:{
          textAlign:"center"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        sortable: false,
        filterable: false,

        // delete button
        Cell: props =>{
          return(
            <button style ={ {backgroundColor:"blue", color:"#fefefe"}}
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
