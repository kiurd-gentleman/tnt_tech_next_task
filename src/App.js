
import React, {useEffect, useState} from "react";
import "./App.css";
import {Route, Switch, useHistory} from "react-router-dom";
import axios from "axios";

// Components
import NavBar from './Components/NavBarComponent'
import Footer from './Components/FooterComponents'

//Pages
import AllPost from './Pages/AllPost'
import PostDetails from './Pages/Post/PostDetails'
import CreatePost from './Pages/Post/CreatePost'
import PostEdit from './Pages/Post/PostEdit'
import UserList from './Pages/Users/UserList'
import Profile from './Pages/Users/Profile'

import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'




function App() {
    const history = useHistory();
    useEffect(() => {
        authUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useMountEffect (()=>console.log('amieikhane asi'))


    const [auth, setAuth] = useState(1);
    const authUser = () => {
        // token = ;
        axios.get(`http://127.0.0.1:8000/api/user`,
            { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
            .then(res => {
                const persons = res.data;
                // allUser = persons.result;
                // console.log(persons.data);
                setAuth(persons.data )
            }).catch(function (error) {
            // handle error
            console.log(error);
            setAuth(null )
            history.push("/login");
        })

    }
  return (

        <div className="App">
          <NavBar auth={auth}/>
          <div className="container content">
              <Switch>
                  <Route exact path="/">
                      <AllPost />
                  </Route>
                  <Route exact path="/login">
                      <Login/>
                  </Route>
                  <Route exact path="/dashboard">
                      <Dashboard/>
                  </Route>
                  <Route exact path="/user-list">
                      <UserList/>
                  </Route>
                  <Route exact path="/post-create">
                      <CreatePost/>
                  </Route>
                  <Route  path="/profile/:user_id">
                      <Profile auth={auth} />
                  </Route>
                  <Route exact path="/post-edit/:productId">
                      <PostEdit/>
                  </Route>
                  <Route   path="/post-details/:productId">
                      <PostDetails auth={auth} />
                  </Route>
                  {/*{(auth 1= null)}*/}
              </Switch>
          </div>
          <Footer/>
        </div>

  );
}

export default App;
