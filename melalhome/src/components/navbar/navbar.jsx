import { Fragment } from "react";
import {  NavLink } from "react-router-dom";
import { e2p } from "../utils/convertor";
import './navbar.css'

function Navbar({ user, postLength}) {

    console.log(postLength)
    return (
        <Fragment>
            <section className="navbar">
                <ul>
                    
                        <Fragment>
                            <NavLink to="/" exact><li>خانه</li></NavLink>
                            <NavLink to="/sale"><li>خرید خانه</li></NavLink>
                            <NavLink to="/rent"><li>اجاره خانه</li></NavLink>
                            <NavLink to="/mortgage"><li>رهن کامل</li></NavLink>
                            <NavLink to="/create-post"><li>افزودن آگهی جدید</li></NavLink> 

                            {user && (
                                <>
                                    <NavLink to="/received">
                                         <li>آگهی های دریافت شده</li>
                                    </NavLink>
                                    <NavLink to="/profile"><li>{user.name}</li></NavLink>
                                    <NavLink to="/logout"><li>خروج از حساب</li></NavLink>
                                </>
                            )}




                        </Fragment>
                </ul>
                
                <div className="logo">
                    <h6>آژانس املاک ملل</h6>
                    <img src="./logo.png" alt="" />
                </div>       

            </section>
        </Fragment>
      );
}

export default Navbar;