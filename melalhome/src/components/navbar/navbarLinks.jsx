import {  NavLink } from "react-router-dom";
import { Fragment } from "react";
function NavbarLinks({user}) {

    return ( 
        <ul>                       
            <Fragment>
                <NavLink to="/" exact ><li>خانه</li></NavLink>
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
     );
}

export default NavbarLinks;