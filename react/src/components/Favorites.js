import React from 'react';

// ReactTable
import ReactTable from "react-table";
import "react-table/react-table.css";

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
		      <div align ='center' style={{marginTop:'0px'}}>
        	    <td align="center">
					<ReactTable
						data={data}
						columns = {[
			
							//=====================================================
							//=====================================================
							{
							Header: "Address",
							// getProps: (state, rowInfo, column) => {
							//   return {
							//       style: {
							//           backgroundColor: 'blue'
							//       },
							//   };
							// },
							columns: [
										//-----------------------------------------
										{
										Header: "Street #",
										accessor: "userId",
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
										Header: "Street Name",
										accessor: "id",
										style:{
										textAlign: "center"
										},
										width: 500,
										maxWidth: 500,
										minWidth: 500,
										filterable: true
									},
									//-----------------------------------------
									{
										Header: "ZIP Code",
										accessor: "id",
										style:{
										textAlign: "center"
										},
										width: 300,
										maxWidth: 300,
										minWidth: 300,
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
										sortable: false,
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
							height: "650px"
						}}
						className="-striped -highlight"
						/>
				   </td>
        	   </div>
			</div>
		  )
	}
}

export default Favorites;
