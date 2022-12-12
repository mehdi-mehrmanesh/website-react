import { Fragment, useEffect, useState } from "react";
import FooterUser from "../../components/footer/footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper";
import { Link } from "react-router-dom";
import { ReactComponent as SaleIcon } from '../../assets/vuesax-bulk-house.svg';
import { ReactComponent as RentIcon } from '../../assets/vuesax-bulk-house-2.svg';
import { ReactComponent as MortgageIcon } from '../../assets/vuesax-bulk-buliding.svg';
import './home.css';
import "swiper/css";
import "swiper/css/pagination";

import "./swiper.css";
import axios from "axios";
import { e2p } from "../../components/utils/convertor";
import axiosInstance from "../../components/config/axios";


function Home() {

    
    const [posts, setPosts] = useState([]);
    const [gallaryImages,setGallaryImages] = useState(['g1', 'g2', 'g3', 'g4'])

    useEffect(() => {
        async function getData(){
            const res = await axiosInstance.get('all_posts')
            setPosts(res.data)
        }

        getData()
        

    },[])

    
    return (
        <Fragment>
            
            <div className="sa_hero_container">
                <div className="layer"></div>
                <h1 style={{zIndex:'1'}}>انتخاب خانه  <br />هوشمندتر از همیشه</h1>
                <h2 style={{zIndex:'1'}}>ما شما را در خرید,اجاره یا فروش ملکتان یاری میکنیم</h2>
                <Link to="/create-post"><button> + ثبت آگهی</button></Link>
            </div>

            <div className="sa_cat_container">
                <Link to="/sale">
                    <div className="each_cat">
                        <div className="circle">
                            <SaleIcon />
                        </div>
                        <p>خرید خانه</p>
                    </div>
                </Link>
                <Link to="/rent">
                    <div className="each_cat">
                        <div className="circle">
                            <RentIcon />
                        </div>
                        <p>اجاره خانه</p>
                    </div>
                </Link>
                <Link to="/mortgage">
                    <div className="each_cat">
                        <div className="circle">
                            <MortgageIcon />
                        </div>
                        <p>رهن کامل</p>
                    </div>
                </Link>
            </div>

            
                    
           


            <div className="sa_post_container">
                <p>جدیدترین آگهی ها</p>
                <Swiper
                   autoplay
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                          },
                          1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                          },
                      }}
                    modules={[Pagination,Autoplay]}
                    className="mySwiper"
                    >
                        {posts.map((item,i) => (<SwiperSlide>
                            <Link to={`/post-detail/${item._id}/${item.post_type}`}>
                                <div className="sa_each_post_card">
                                    <img src={item.images[0]} alt="" />
                                    <div className="sa_each_post_card_detail">
                                        <p className="region">{e2p(item.meterage)} متری, {item.region}</p>
                                        <p className="detail">
                                            <span> {e2p(item.room_count)} خوابه </span>
                                            <span> {e2p(item.floor)} طبقه </span>
                                            <span>  سال ساخت {e2p(item.age)}</span>
                                        </p>
                                        <div className="price">
                                            {item.post_type === 'rent' ? (<p><span>{e2p(item.rent)} میلیون</span><span>{e2p(item.mortgage)} میلیون</span></p>) 
                                            : item.post_type === 'sale' ? (<p>{e2p(item.sale)} میلیون</p>) 
                                            : item.post_type === 'full_mortgage' ? (<p>{e2p(item.full_mortgage)} میلیون</p>) : null}
                                        </div>
                                        
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>))}
                       
                </Swiper>
            </div>



            <div className="experts_container">
                <h5>کارشناسان ما</h5>
                 <div className="each_card_container">
                    <div className="each_card">
                        <div className="circle" style={{backgroundImage: 'url(./shahram_hasani.jpg)'}}>
                        </div>
                        
                        
                        <p>شهرام حسنی</p>
                    </div>   

                    <div className="each_card">
                        <div className="circle" style={{backgroundImage: 'url(./rezvan_hasani.jpg)'}}></div>
                        <p>رضوان حسنی</p>
                    </div>         
                 </div>
            </div>


            <div className="gallary">
                <h5>گالری تصاویر</h5>
                <Swiper
                    autoplay
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                          },
                          1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                          },
                      }}
                    modules={[Pagination,Autoplay]}
                    className="mySwiper2"
                    >                       
                    {gallaryImages.map((item) =>  <SwiperSlide> <img src={`/${item}.jpeg`} alt="" /> </SwiperSlide>)}
                                              
                </Swiper>

            </div>

           
        </Fragment>
    );
}

export default Home;