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
                            <th></th>
                            <th>Address ID</th>
                            <th>Address</th>
                            <th>Zip Code</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.data.map(_data =>{
                                return( //needs to correspond each key, will fix later (for excel file)
                                   <tr key={_data._id}>
                                       <td>{_data._id}</td>
                                       <td>{_data._id}</td>
                                       <td>{_data._id}</td>
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