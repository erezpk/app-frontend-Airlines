import lodash  from "lodash";
import PropTypes from 'prop-types'

const Pagination = (props) => {
    const { itemCount, pageSize, currentPage, onPageChange} = props;
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount === 1) return null;
    const pages = lodash.range(1, pageCount + 1);    
    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => {
            return (
              <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                <span className="page-link" onClick={()=> onPageChange(page)}>{page}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };
  
  Pagination.propTypes = {
      itemCount : PropTypes.number.isRequired, 
      pageSize : PropTypes.number, 
      currentPage: PropTypes.number, 
      onPageChange :PropTypes.func
  }
  
  export default Pagination;