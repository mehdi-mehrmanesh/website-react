// import axios from "axios";
import axiosInstance from "../../components/config/axios";
import React, {Fragment, useState} from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card/card";
import Pagination from "../../components/pagination/pagination";
import ReactLoading from "react-loading";
import Search from "../../components/search/search";
import { paginate } from '../../components/pagination/paginate';

function Rents({location}) {


    const [rents, setRents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize,setPageSize] = useState(8)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function getData(){
            const res = await axiosInstance.get('rents').then(res => {
                setRents(res.data)
                setLoading(false)
            })
            
        }

        getData()

    },[])

    const handlePageChange = page => {
        setCurrentPage(page)
    }

    const rent = paginate(rents, currentPage, pageSize);

    return (
        <Fragment>
           <Search />
           <div className="cardsWrapper">
            { loading ? <ReactLoading type='bubbles' color='#533cdd' className="loading_container"/> : null}
            { rent.length !== 0 ? rent.map((item,i) => <Link key={i} to={`/post-detail/${item._id}/${item.post_type}`}><Card
                   cardData={item}
                /></Link>  ) : null}
           </div>
           <Pagination itemsCount={rents.length} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange}/>
        </Fragment>
      );
}

export default Rents;