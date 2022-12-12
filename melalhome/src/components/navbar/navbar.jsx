import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Slant as Hamburger } from 'hamburger-react'

import MediaProvider from "../mediaProvider/media";
import { e2p } from "../utils/convertor";
import './navbar.css'
import NavbarLinks from "./navbarLinks";

function Navbar({ user, postLength}) {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const {pathname} = useLocation();
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        setNavbarOpen(false);
        setOpen(false)
    }, [ pathname ]);

    // const handleToggle = () => {
    //     setNavbarOpen(!navbarOpen)
    // }

    return (
        <MediaProvider>
            <Fragment>
                <section className="navbar">
                    {window.matchMedia('(max-width: 1000px)').matches ? (     
                        <>
                            {/* <button >{navbarOpen ? 'ٓX' : '-'}</button> */}
                            <Hamburger color="#000" toggled={isOpen} toggle={setOpen}  size={20} onToggle={toggled => {
                                toggled ? setNavbarOpen(true) : setNavbarOpen(false)
                            }}/>
                        </>                 
                    ) : (
                      <NavbarLinks user={user}/>
                    )}

                    
                    <div className="logo">
                        <h6>آژانس املاک ملل</h6>
                        {/* <img src="./logo.png" alt="" /> */}
                    </div>       

                </section>

                {navbarOpen ? (<div className="hamburger_menu"><NavbarLinks user={user}/></div>) : null}
            </Fragment>
        </MediaProvider>
        
      );
}

export default Navbar;