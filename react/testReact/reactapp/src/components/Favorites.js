import React from 'react';

// ReactTable
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from 'react-redux'
import { SIGTERM } from 'constants';
import axios from 'axios';

// Header, Footer
//import { Authors, Logo, GitHubLink } from "/Users/flo/Desktop/491/testReact/testapp/src/Utils.js";

// we want to output different links
// each link gets its own class
class Favorites extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount(){
		try{
			console.log('get fav of user',this.props.auth.favs[0].userName)
			console.log('user favs',this.props.auth.favs[0].favorites)
		  }
		catch(e){
			console.log("error",e)
		}

		axios.get('http://localhost:4200/getSites')
		.then((res) => {
			console.log('fav success',res.data)
			console.log('fav props.auth.favs',this.props.auth.favs[0].favorites)
			var fav_arr = this.props.auth.favs[0].favorites;
			var all_sites = res.data;
			var returnedobj = {};
			var objArr = []
			for (var i in all_sites){
				var obj = all_sites[i]
				var obj_id = obj['_id']
				//console.log("obj_id " , obj_id)
				for (var j in fav_arr){
					var fav_id = fav_arr[j]
					//console.log("inside id",fav_id)
					if(fav_id === obj_id){
						console.log("got it ",obj_id)

						console.log('this is the listing',all_sites[i])
						
						var temp = all_sites[i];

						//var IDk = Object.assign(temp, returnedobj);
						//console.log('IDK', IDk);
						//console.log("temp",temp)
						//returnedobj = Object.assign(temp,returnedobj);
						objArr.push(temp)
					}
				}
			}
			console.log('objaray',objArr)
			//console.log("THIS IS MY JSONLIST",returnedobj)

			

			this.setState({data: objArr})

			// console.log('gfsgfd',all_sites[0])


			// for (let obj in all_sites) {
			// 	console.log('obj',obj[1]._id)
		
			// 	for (var id in this.props.auth.favs[0].favorites){
			// 		if (id === obj['_id']){
			// 			console.log('ids',id);
			// 		}
			// 	}
			// }
		}).catch((e) => {
			console.log(e)
		});

		







		// // this link will be replaced with our data
		// const url = "https://jsonplaceholder.typicode.com/posts";
		// fetch(url, {
		//   method: "GET"
		// }).then(response => {
		//   return response.json();
		// })
		// .then(data => {
		//   this.setState({data: data})
		//   //console.log(this.state.data)
		  
		// });
	}

	render() {
		console.log('THIS IS THE FAVORITES',this.state)
		const { data } = this.state; 
		return (
			<div>
				<div className="favTable">
				<ReactTable
					data={data}
					columns = {[
						//=====================================================
						//=====================================================
						{
						Header: "Address",
						columns: [
									//-----------------------------------------
									{
									Header: "Street #",
									accessor: "Street #",
									style:{
									textAlign: "center"
									},
									width: 200,
									maxWidth: 200,
									minWidth: 200,
									filterable: true,
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
						//=====================================================
						//=====================================================
						Header: "Info",
						columns: [
									{
									//-----------------------------------------
									Header: "Sale Price",
									accessor: "title",
									sortable: true,
									filterable: true,
									width: 150,
									maxWidth: 200,
									minWidth: 200
									}
									//-----------------------------------------
								]
						},
				
						//=========================================================
						//=========================================================
						{
						Header: "Actions",

						columns: [
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
                                                        this.getListing(props.original._id);
                                                      }}
                                    >Link</button>
                                  )
                                }
                            },
							{
								Header: "",
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
									<button style ={ {backgroundColor:"#c74949", color:"#fefefe"}}
														onClick={() => {
														this.deleteRow(props.original.id);
														}}
									>Delete</button>
									)
								},

							}
						]
						
						}
						//=========================================================
						//=========================================================
					]}
					
					defaultPageSize={25}
					style={{
						height: "600px"
					}}
					className="-striped -highlight"
					/>
        	   </div>
			</div>
		  )
	}
}

const mapStateToProps = (state) => {
	console.log('fav.js mapStatetoProps hi',state);
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Favorites);
