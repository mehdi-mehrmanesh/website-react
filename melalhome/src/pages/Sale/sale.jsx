import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/card";

import axios from "axios";
import Pagination from "../../components/pagination/pagination";
import { paginate } from '../../components/pagination/paginate';
import ReactLoading from "react-loading";
import Search from "../../components/search/search";
import axiosInstance from "../../components/config/axios";

function Sale({location}) {


    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize,setPageSize] = useState(8)
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        async function getData(){
            const res = await axiosInstance.get('sales')
            setSales(res.data)
            setLoading(false)
        }

        getData()

    },[])



    const handlePageChange = page => {
        setCurrentPage(page)
    }

    const sale = paginate(sales, currentPage, pageSize);



    return ( 
        <>
        <Search />
        <div className="cardsWrapper">
        {loading ? (<ReactLoading type='bubbles' color='#533cdd' className="loading_container"/>) : null} 
            {sale.length !== 0 ? sale.map((item,i) => <Link  key={i}  to={`/post-detail/${item._id}/${item.post_type}`}><Card
                    cardData = {item}
                /></Link>  ) : <h4>داده ای برای نمایش وجود ندارد</h4>}
           </div>
           <Pagination itemsCount={sales.length} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange}/>
        </> 
    );
}

export default Sale;<>Sale</>