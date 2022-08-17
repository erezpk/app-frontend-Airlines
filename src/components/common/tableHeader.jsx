import React, { Component } from "react";

class TableHeader extends Component {

  raisSort = (path) => {
    const { onSort } = this.props;
    let sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else sortColumn = { path: path, order: "asc" };
    onSort(sortColumn);
  };
  renderSortIcon = (column)=>{
    if(column.order === "asc"){
      return <i className="fa fa-sort-desc" aria-hidden="true"></i>
    } 
    return <i className="fa fa-sort-asc" aria-hidden="true"></i>
  }

  
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr className='td-table'>
          {columns.map((c) => {
            return (
              <th key={c.path || c.key} className='td-table clickable' onClick={(e)=>this.raisSort(c.path)} > 
                {c.label || c.key} {!c.key && this.renderSortIcon(c)}
              </th>
            );
          })}
          
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
