import React from 'react';


const Like = props => {
   
    return ( <i  className= 'fa fa-heart-o'  aria-hidden="true" onClick={(e)=>props.onClick(e)}></i> );
}
 
export default Like;




