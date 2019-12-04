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

	reload = (props) => {
		console.log("reload CALLED")
		//const current = props.location.pathname;
		this.props.history.replace('/reload');
		   setTimeout(() => {
			 this.props.history.replace('/favorites');
		   });
	   }

	handleClick(event){
		//event.preventDefault();
		console.log("DJSKLADJKLASKLJKLSDJJAKLSDJSAKI GOT CLICKED")
	}

	componentDidMount(){
		// try{
		// 	console.log('get fav of user',this.props.auth.favs[0].userName)
		// 	console.log('user favs',this.props.auth.favs[0].favorites)
		//   }
		// catch(e){
		// 	console.log("error",e)
		// }

		axios.get('http://localhost:4200/getSites')
		.then((res) => {
			// console.log('fav success',res.data)
			// console.log('fav props.auth.favs',this.props.auth.favs[0].favorites)
			var fav_arr = this.props.auth.favs[0].favorites;
			var all_sites = res.data;

			var objArr = []
			for (var i in all_sites){
				var obj = all_sites[i]
				var obj_id = obj['_id']
				//console.log("obj_id " , obj_id)
				for (var j in fav_arr){
					var fav_id = fav_arr[j]
					//console.log("inside id",fav_id)
					if(fav_id === obj_id){
						//console.log("got it ",obj_id)

						//console.log('favorites, got the fav listing  from db',all_sites[i])
						
						var temp = all_sites[i];
						objArr.push(temp)
					}
				}
			}
			//console.log('objaray',objArr)
			this.setState({data: objArr})
		}).catch((e) => {
			console.log(e)
		});
	}

	render() {
		//console.log('THIS IS THE FAVORITES',this.state)
		const { data } = this.state; 
		return (
			<div>
				<div className="favTable">
				<ReactTable
					data={data}
					columns = {[

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
						//=====================================================
						//=====================================================
						{
						Header: "Address",
						columns: [
									//-----------------------------------------
									{
									Header: "Street #",
									accessor: "Street_Num",
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
										accessor: "Street_Name",
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
										accessor: "ZIP_Code",
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
									accessor: "Sale_Price",
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
