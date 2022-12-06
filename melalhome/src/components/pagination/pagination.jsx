import _ from 'lodash';
import { e2p } from '../utils/convertor';
import './pagination.css';

const Pagination = (props) => {

    

    const { itemsCount, pageSize, currentPage, onPageChange } = props;


    const pageCount = Math.ceil(itemsCount / pageSize);

    if(pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    
    
    

    
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={ page === currentPage ? 'page-item active' : 'page-item'} onClick={() => onPageChange(page)}>
                        <a>{e2p(page)}</a>
                    </li>
                ))}
               
                
            </ul>
        </nav>
    );
}
 
export default Pagination;