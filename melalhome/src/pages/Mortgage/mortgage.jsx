import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/card";
import axios from "axios";
import Pagination from "../../components/pagination/pagination";
import { paginate } from '../../components/pagination/paginate';
import ReactLoading from "react-loading";
import Search from "../../components/search/search";
import axiosInstance from "../../components/config/axios";



function Mortgage({location}) {

    const [mortgages, setMortgages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize,setPageSize] = useState(8)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function getData(){
            const res = await axiosInstance.get('mortgages')

            setMortgages(res.data)
            setLoading(false)
        }

        getData()

    },[])

    const handlePageChange = page => {
        setCurrentPage(page)
    }

    const mortgage = paginate(mortgages, currentPage, pageSize);

    return ( 
        <>
       <Search />
         <div className="cardsWrapper">
            {loading ? (<ReactLoading type='bubbles' color='#533cdd' className="loading_container"/>) : null} 
            {mortgage.length !==0 ? mortgage.map((item,i) => <Link to={`/post-detail/${item._id}/${item.post_type}`}><Card
                    cardData={item}
                /></Link>  ) : <h4>داده ای برای نمایش وجود ندارد</h4>}
           </div>
           <Pagination itemsCount={mortgages.length} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange}/>

        </>
     );
}

export default Mortgage;