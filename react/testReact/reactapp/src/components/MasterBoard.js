//=======================================================================
// IMPORTS
//=======================================================================
// React
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'


// ReactTable
import ReactTable from "react-table";
import "react-table/react-table.css";

// Header, Footer
//import { Authors, Logo, GitHubLink } from "/Users/flo/Desktop/491/testReact/testapp/src/Utils.js";

//import NavBar from './components/Navbar'
import './Navbar.css';
import './Dashboard.css';
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
class MasterBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }
  //----------------------------------------------------------------------
  // getData
  // fetch data from database and store it into component
  //----------------------------------------------------------------------
  getData(){
      fetch(path + '/getSites',{
        method: "GET"
      })
      .then(response => {
        console.log('Fetching data...');
        return response.json(); //return the promise
      })
      .then(data => {
        this.setState({data: data}); //set state
        console.log("Setting state...")
        console.log("Data:",this.state.data)
      })
      .catch(err => {
        console.log('error: ',err.message);
      }); 

  }
  //----------------------------------------------------------------------
  // componentDidMount()
  // built-in JS function that is called after render() renders the page
  // basically just calls a function to get the data
  //----------------------------------------------------------------------
  componentDidMount(){
    this.getData();
  }

  //----------------------------------------------------------------------
  // deleteRow() 
  // input: takes an id to the array corresponding to a row
  // after delete button is clicked, row is deleted
  // pre-cond: address exists in user's database
  // post-cond: address is deleted from user's database, not master database
  //----------------------------------------------------------------------
  deleteRow(id){
    const index = this.state.data.findIndex(_data => {
      //console.log(_data.Address_ID);
      return _data.Address_ID === id;
    })
    // once delete button is clicked, remove from table
    console.log(index)
    this.state.data.splice(index, 1);
    this.setState({data: this.state.data});
  }

  //----------------------------------------------------------------------
  // getListing()
  // input: row # of the address 
  // opens a page in a new tab after clicking "link"
  //----------------------------------------------------------------------
  getListing(id){
    console.log("getlisting",id)
    var url = this.state.data[id].Link;
    try{
      window.open(url);
    }
    catch(e){
      console.log('url error',e.error)
    }
  }

  //----------------------------------------------------------------------
  // bookMarkRow() 
  // input: takes an id to the array corresponding to a row
  // after booknmark button is clicked, row is bookmarked to user account
  // pre-cond: address exists in user's database
  // post-cond: address is saved in user's database, not master database
  //----------------------------------------------------------------------
  bookmarkRow(id){
    // const index = this.state.data.findIndex(_data => {
    //   return _data.Address_ID === id; //WE DONT HAVE AN ID RIGHT NOW, WAIT FOR JOSEPHS LIST OR W/E
    // })
    // console.log(index)
    var userName = this.props.auth.favs[0].userName;
    var siteId = this.props.auth.favs[0]._id;
    console.log('masterboard props',this.props.auth )
    console.log('masterboard id' ,siteId);
    console.log('masterboard user',userName);
    axios.post('http://localhost:4200/updateFavorites' , {
      username: userName,
      siteid: siteId

    })
    .then((res) => {
      console.log('response',res)
    })
    // once delete button is clicked, remove from table
    //this.state.data.splice(index, 1);
    //this.setState({data: this.state.data});
  }

  //----------------------------------------------------------------------
  // render(): displays image on the UI as a component
  //
  // columns: listing, address, sale price, contaminant (tentative)
  // so we need to convert our listings to json objects
  // accessor is the key to each object
  //----------------------------------------------------------------------
  render(){
    console.log("MASTERBOARD" , this.state)
    const {data} = this.state; 
    
    return (
      <div>
        <div className='masterBoard' style={{margin:'auto'}}>
            <ReactTable
              data={data}
                columns = {[

                  //=====================================================
                  //=====================================================

                  {
                    Header:"",
                    accessor:"_id",
                    style:{
                      textAlign:"center"
                    },
                    width: 100,
                    maxWidth: 100,
                    minWidth: 100,
                  },
                  
                  {
                    Header: "Address",
                    columns: [
                              //-----------------------------------------
                              {
                              Header: "Street Number",
                              accessor: "Street #",
                              style:{
                                textAlign: "center"
                              },
                              width: 200,
                              maxWidth: 200,
                              minWidth: 200,
                              filterable: true
                            },
                            //-----------------------------------------
                            {
                              Header: "Street Name",
                              accessor: "Street Name",
                              style:{
                                textAlign: "center"
                              },
                              width: 300,
                              maxWidth: 300,
                              minWidth: 300,
                              filterable: true
                            },
                            //-----------------------------------------
                            {
                              Header: "ZIP Code",
                              accessor: "ZIP Code",
                              style:{
                                textAlign: "center"
                              },
                              width: 200,
                              maxWidth: 200,
                              minWidth: 200,
                              filterable: true
                            }
                            //-----------------------------------------
                            ],
                  },
                  {
                    Header: "Sale Price",
                    accessor: "Sale_Price",
                    sortable: false,
                    filterable: true,
                    width: 200,
                    maxWidth: 200,
                    minWidth: 200
                  },
                  {
                    //=====================================================
                    //=====================================================
                    Header: "Actions",
                    columns: [
                          
                              //-----------------------------------------         
                              {
                                Header: "",
                                style:{
                                  textAlign:"right"
                                },
                                width: 300,
                                maxWidth: 300,
                                minWidth: 300,
                                sortable: false,
                                filterable: false,
                        
                                // delete button
                                Cell: props =>{
                                  return(
                                    <button style ={ {backgroundColor:"#849fdb", color:"#ffffff"}}
                                                      onClick={() => {
                                                        this.getListing(props.original.Address_ID);
                                                      }}
                                    >Link</button>
                                  )
                                }
                              },
                              {
                                Header:"",
                                style:{
                                  textAlign:"left"
                                },
                                width: 200,
                                maxWidth: 200,
                                minWidth: 200,
                                sortable: false,
                                filterable: false,
                        
                                //bookmark button
                                Cell: props =>{
                                  return(
                                    <button style ={ {backgroundColor:"#7fb369", color:"#fefefe"}}
                                                      onClick={() => {
                                                        this.bookmarkRow(props.original.Address_ID);
                                                      }}
                                    >Save</button>
                                  )
                                }
                                }
                              //-----------------------------------------
                            ],
                  }
                  //=========================================================
                  //=========================================================
                ]}
                
                defaultPageSize={25}
                style={{
                  height: "600px",
                }}
                className="-striped -highlight"
                />

         </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	console.log('MasterBoard.js mapStatetoProps hi',state);
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(MasterBoard);
