import React from 'react';

// ReactTable
import ReactTable from "react-table";
import "react-table/react-table.css";
import { connect } from 'react-redux'

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
		
		// this link will be replaced with our data
		const url = "https://jsonplaceholder.typicode.com/posts";
		fetch(url, {
		  method: "GET"
		}).then(response => {
		  return response.json();
		})
		.then(data => {
		  this.setState({data: data})
		  console.log(this.state.data)
		});
	}

	render() {
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
									accessor: "userId",
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
										accessor: "id",
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
										accessor: "id",
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
									},
									//-----------------------------------------
									{
									Header: "Link",
									accessor: "body",
									sortable: false,
									filterable: false
									}
									//-----------------------------------------
								],
						},
				
						//=========================================================
						//=========================================================
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
							<button style ={ {backgroundColor:"#c74949", color:"#fefefe"}}
												onClick={() => {
												this.deleteRow(props.original.id);
												}}
							>Delete</button>
							)
						}
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
