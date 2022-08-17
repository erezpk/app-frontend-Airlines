
import React, { Component } from 'react';
import _ from "lodash"

class TableBody extends Component {
    state = {  } 
    renderCell = (item , column)=>{
        if(column.content)return column.content(item);

        return _.get(item, column.path);
    }
    createKey = (item, column)=>{
        return item.id + (column.path || column.key)
    }
    render() { 
        const {Data, columns} = this.props;
        
        return(
                <tbody>
                    {Data && Data.map(item=>(
                        <tr key={item.id}>
                            {columns.map(column=> {

                            return(
                            <td key={this.createKey(item, column)} className='td-table'>{this.renderCell(item , column)}</td>
                            )})}
                        </tr>
                    ))}


                </tbody>
        )

    }
}



export default TableBody;