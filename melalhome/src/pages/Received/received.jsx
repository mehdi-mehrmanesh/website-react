import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Card from "../../components/card/card";
import axiosInstance from "../../components/config/axios";

function Received({user}) {

    const [loading,setLoading] = useState(true)
    const [post, setPost] = useState([]);
    useEffect(() => {

        async function getData(){
            const res = await axiosInstance.get('admin/received').then((res) => {
                setPost(res.data)
                setLoading(false)
            })
            
        }

        getData()

    },[])


    return (  
       <div className="cardsWrapper">
        {loading ? <ReactLoading type='bubbles' color='#533cdd' className="loading_container"/> : null} 
        {post.length !==0 ? post.map((item,i) => (
            <Link key={i}  to={`/post-detail/${item._id}/${item.post_type}`}>
                <Card
                    user={user}
                    key={i} 
                    cardData={item}
                />           
            </Link>
           
        )) : <h4>داده ای برای نمایش وجود ندارد</h4>}
       </div> 
    );
}

export default Received;
