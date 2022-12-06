
import { Route, Switch, Redirect, Router, BrowserRouter,} from "react-router-dom";

import Rents from "../../pages/Rents/rents";
import Mortgage from "../../pages/Mortgage/mortgage";
import Sale from "../../pages/Sale/sale";
import PostDetail from "../../pages/PostDetail/postDetail";
import Login from "../../pages/Login/login";
import Received from "../../pages/Received/received";
import Logout from "../utils/logout";
import CreatePost2 from "../../pages/CreatePost/create_post";
import NotFound from "../../pages/NotFound/notFound";
import PrivateRoute from "./privateRoute";
import PublicRoutes from "./publicRoutes";
import Home from "../../pages/Home/home";
import { useState } from "react";

function Routes({user}) {
    return (
            <Switch>  
                    <PublicRoutes restricted={false} path="/" exact component={Home}/>
                    <PublicRoutes restricted={false} path="/rent" component={Rents} />
                    <PublicRoutes restricted={false} path="/sale" component={Sale} />
                    <PublicRoutes restricted={false} path="/mortgage" component={Mortgage} />
                    <PublicRoutes restricted={false} path="/post-detail/:id/:posttype" render={(props) => <PostDetail {...props} user={user}  />}/>
                    <PublicRoutes path="/create-post" render={(props) => <CreatePost2 {...props} user={user} />}/> 
                    <PublicRoutes path="/login" restricted={true} component={Login} />
                    <PublicRoutes path='/not-found' restricted={false} component={NotFound} />
                    
                    <PrivateRoute path='/received' component={Received} user={user} />
                    <PrivateRoute path='/logout' component={Logout}/>

                    <Redirect to='/not-found'/>             
            </Switch>
      );
}

export default Routes;

