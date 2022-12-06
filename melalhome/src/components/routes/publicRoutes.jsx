import { Redirect, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

const getCurrentUser = () => {
    try {
      const jwt = localStorage.getItem('token');
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
}


const PublicRoutes = ({path, component: Component, render,user, ...rest}) => {
    return (
        <Route 
        {...rest}
        render={props => {
            if(rest.restricted) 
                if(getCurrentUser()) 
                   return <Redirect to='/' />
                
            return Component ? <Component {...props}  user={user} /> : render(props);
        }}
    
        />
    )
}

export default PublicRoutes;