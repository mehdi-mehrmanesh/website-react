import { Redirect, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

const getCurrentUser = () => {
    try {
      const jwt = localStorage.getItem('token');
      return (jwt);
    } catch (ex) {
      return null;
    }
}


const PrivateRoute = ({path, component: Component, render,user, ...rest}) => {
    return (
        <Route 
        {...rest}
        render={props => {
            if(!getCurrentUser()) return <Redirect to='/login' />
            return Component ? <Component {...props}  user={user} /> : render(props);
        }}
    
        />
    )
}

export default PrivateRoute;