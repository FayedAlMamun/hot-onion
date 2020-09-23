import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Details from './components/Details/Details';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import OrderPlaced from './components/OrderPlaced/OrderPlaced';

export const userContext = createContext();
export const userInfo=createContext();


function App() {
  const [menu,setMenu]=useState([]);
  const [loggedInUser,setLoggedInUser]=useState([])
  return (
    <userInfo.Provider value={[loggedInUser,setLoggedInUser]}>
    <userContext.Provider value={[menu, setMenu]}> 
    <Router>
        
        <Switch>
          <Route exact path="/">
           <Header/>
          </Route>
          <Route path="/home">
          <Header/>
          </Route>
          <Route path='/detail/:id'>
            <Details></Details>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <PrivateRoute path='/order'>
            <OrderPlaced></OrderPlaced>
          </PrivateRoute>
          </Switch>
          </Router>
          </userContext.Provider>
           </userInfo.Provider>
  );
}

export default App;
