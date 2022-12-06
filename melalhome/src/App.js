
import './App.css';

import Navbar from './components/navbar/navbar';
import Routes from './components/routes/routes';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import FooterUser from './components/footer/footer';
import { useLocation } from 'react-router-dom';
import axiosInstance from './components/config/axios';


function App() {


const location = useLocation();
const [user,setUser] = useState();


  useEffect(()=>{

    try {
          const jwt = localStorage.getItem("token");
          const user = jwtDecode(jwt)
          setUser(user);
      
    } catch (error) {
      
    }

  }, [])
  
  return (
    <>
   
    {location.pathname !== "/login" ? <Navbar user={user}/> : null}
        <Routes user={user}/>
    {location.pathname !== "/login" ? <FooterUser/> : null}
   
    </>
  );
}

export default App;
