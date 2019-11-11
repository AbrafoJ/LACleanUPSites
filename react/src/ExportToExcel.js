import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ExportToExcel extends Component{
    render(){
        return(
            <div style = {{marginRight: '25px'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls'button"
                    className="export"
                    table="table-to-xls"
                    filename="filteredData"
                    sheet="tablexls"
                    buttonText="Export"/>
                <table hidden="true" id="table-to-xls">
                    <thead>
                        <tr>
                            <th>Property Listing</th>
                            <th>Address</th>
                            <th>Other</th>
                            <th>Sale Price</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.posts.map(post =>{
                                return(

                                   <tr key={post.id}>
                                       <td>{post.id}</td>
                                       <td>{post.userId}</td>
                                       <td>{post.title}</td>
                                       <td>{post.title}</td>
                                       <td>{post.body}</td>
                                   </tr> 
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ExportToExcel;