import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper";
import ReactLoading from "react-loading";
import moment from "jalali-moment";
import { ReactComponent as Elevator } from '../../assets/Group 673.svg';
import { ReactComponent as Warehouse } from '../../assets/vuesax-linear-buliding.svg';
import { ReactComponent as Parking } from '../../assets/vuesax-linear-car.svg';
import { ReactComponent as Location } from '../../assets/location.svg';
import { ReactComponent as Copy } from '../../assets/moneys.svg';
import "./postDetail.css";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import { e2p } from "../../components/utils/convertor";
import { booleanConv } from "../../components/utils/boolean";
import { invert } from "lodash";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
import axiosInstance from "../../components/config/axios";
//import "./swiper.css";

function PostDetail({match, user, history}) {

    const [rents, setRents] = useState();
    const [btnInformation, setBtnInformation] = useState( false );
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function getData(){
            const res = await axiosInstance.get(`${match.params.posttype}/postdetail/?id=${match.params.id}`).then(res => {
                setRents(res.data)
                setLoading(false)
                
            })
            
            
        }
        getData()
    },[])

    const deletePost = () => {
        async function getData(){
            const res = await axiosInstance.delete(`admin/delete/?id=${match.params.id}&post_type=${match.params.posttype}`).then(res => {
                setLoading(false)
                res.status === 200 ? Swal.fire({
                    text: 'آکهی با موفقیت حذف شد',
                    icon: 'success',
                    confirmButtonText: 'باشه'
                  }).then(()=>{
                    history.goBack()
                  }) : 
                  Swal.fire({
                    text: '!مشکلی در ثبت فرم بوجود آمد',
                    icon: 'error',
                    confirmButtonText: 'باشه'
                  })
            })          
        }
        getData()
    }


    const publishPost = () => {
        async function getData(){
            const res = await axiosInstance.put(`admin/publish/?id=${match.params.id}&post_type=${match.params.posttype}`).then(res => {
                setLoading(false)
                res.status === 200 ? Swal.fire({
                    text: ' آگهی منتشر شد',
                    icon: 'success',
                    confirmButtonText: 'باشه'
                  }).then(()=>{
                    history.goBack()
                  }) : 
                  Swal.fire({
                    text: '!مشکلی در ثبت آگهی بوجود آمد',
                    icon: 'error',
                    confirmButtonText: 'باشه'
                  })
            })          
        }
        getData()
    }


    const copy = (text)=>{
        navigator.clipboard.writeText(text);
        alert("شماره تماس در کلیپ برد کپی شد" );
    }

    return (

        
        <>
        
        {loading ? (<ReactLoading type='bubbles' color='#533cdd' className="loading_container"/>)
         : 
         <> 
         {user && (<div className="actionButtonAdmin_container">
                <button className="delete" onClick={deletePost}>حذف آگهی</button>
                <button className="publish" onClick={publishPost}>انتشار آگهی</button>
            </div>)}
         <div className="container text-right rtl">
            {/* {user && (<div className="actionButtonAdmin_container">
                <button className="delete" onClick={deletePost}>حذف آگهی</button>
                <button className="publish" onClick={publishPost}>انتشار آگهی</button>
            </div>)} */}
            <div className="w-50">
                <h1 className="float-right w-100 ts-20">{e2p(rents.meterage)} متری </h1>
                <p className="float-right w-100">
                    <Location className="iconAddress"/>
                    {rents.region}
                    {rents.address}
                </p>
                <ul className="labelDetails">
                    <li>{e2p(rents.room_count)} خوابه</li>
                    <li> طبقه : {e2p(rents.floor)}</li>
                    <li> سال ساخت : {e2p(rents.age)}</li>
                    <li> نوع ملک : {rents.property_type}</li>
                    <li> تاریخ ثبت آگهی {rents.submit_date} </li>
                </ul>

               
                <p>
                    { rents.post_type === 'rent' ?  (<>
                     رهن <b>{e2p(rents.mortgage)}</b> میلیون ,
                     اجاره<b> {e2p(rents.rent)}</b> میلیون</>)
                        : rents.post_type === 'sale' ? (<> فروش <b> {e2p(rents.sale)} </b> میلیون </>)
                        : rents.post_type === 'full_mortgage' ? (<>رهن کامل<b> {e2p(rents.full_mortgage)}</b>  میلیون</>)
                        : null
                    }
                </p>
                  
                {/* <p className="float-right w-100">رهن <b>{e2p(rents.mortgage)} میلیون</b> اجاره <b>{e2p(rents.rent)} میلیون</b></p> */}
                
                <div className="w-100 float-right my-10 boxInformation">
                    <div className="w-50 float-right">
                        <button className="btnInformation" onClick={e=>{ setBtnInformation(!btnInformation)}}>اطلاعات بیشتر</button>
                    </div>
                    <div className="w-50 float-right">
                        {/* <a href="#" rel={"nofollow"}>
                            <img src={"/images/path.svg"} className={"w-20p mx-10 float-left"} alt="share"/></a>
                        <a href="#" rel={"nofollow"}>
                            <img src={"/images/vuesax-linear-archive-minus.svg"} className={"w-20p mx-10 float-left"} alt="bookMark"/></a> */}
                    </div>
                    {(btnInformation) ?
                        <div className="w-100 float-right my-10">

                            <div className="float-right w-100">
                                <div className={"float-left ltr btnCopy"} >
                                    <Copy className={"w-20p float-left mx-10"}/>
                                    <p className={"float-left m-0 text-red"} onClick={()=>{copy(`0${rents.mobile}`)}}>۰{e2p(rents.mobile)}</p>
                                    
                                </div>
                            </div>
                            <p className="descriptionInformation float-right w-100">
                               <b> نام مالک: </b> {rents.ownerName}
                               
                            </p>
                        </div> : ''
                    }
                </div>

                <div className="mainInformation">
                    <h3>اطلاعات بیشتر</h3>
                    <ul>
                        <li><p> کابینت : {rents.cabinets}</p></li>
                        <li><p> نما : {rents.view}</p></li>
                        <li><p> تعداد واحد در طبقه : {e2p(rents.unit_count)}</p></li>
                        <li><p> توالت فرنگی : {booleanConv(rents.toilet)}</p></li>
                        <li><p>  تراس : {booleanConv(rents.terrace)}</p></li>
                        <li><p>  اجاق گاز رومیزی : {booleanConv(rents.oven)}</p></li>
                        <li><p>   کف‌پوش  : {rents.floorـcovering}</p></li>

                    </ul>
                </div>
                <div className="feature">
                    <h3>ویژگی ها و امکانات</h3>
                    <ul>
                        <li><Elevator style={{filter: rents.elevator ? 'unset' : 'invert(1)'}}/><p style={{opacity: rents.elevator ? '1' : '0.2'}}>آسانسور</p></li>
                        <li><Warehouse style={{filter: rents.warehouse ? 'unset' : 'invert(1)'}}/><p style={{opacity: rents.warehouse ? '1' : '0.2'}}>انباری</p></li>
                        <li><Parking style={{filter: rents.parking ? 'unset' : 'invert(1)'}}/><p style={{opacity: rents.parking ? '1' : '0.2'}}>پارکینگ</p></li>
                    </ul>
                </div>
                <div className="description">
                    <h3>توضیحات</h3>
                    <p>{rents.description}</p>
                </div>
            </div>

            <div className="w-50" style={{padding: '0 20px'}}>
            <Swiper
                    autoplay
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination,Autoplay]}
                    className="mySwiper"
                    >
                     {rents?.images.map((item,i)=>(
                            <SwiperSlide>
                                <img src={item} alt="" />
                            </SwiperSlide>
                     ))}  
                </Swiper>
            </div>
        </div></> }
        </>
    );


}

export default PostDetail;