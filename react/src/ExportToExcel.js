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
                <table hidden={true} id="table-to-xls">
                    <thead>
                        <tr>
                            <th>Property ID</th>
                            <th>Property ID</th>
                            <th>Property Address</th>
                            <th>Sale Price</th>
                            <th>Property ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.posts.map(post =>{
                                return(
                                   <tr key={post.id}>
                                       <td>{post.userId}</td>
                                       <td>{post.userId}</td>
                                       <td>{post.title}</td>
                                       <td>{post.body}</td>
                                       <td>{post.userId}</td>
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