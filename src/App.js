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
import OrderCompleted from './components/OrderCompleted/OrderCompleted';
import NoMatch from './components/NoMatch/NoMatch';

export const userContext = createContext();
export const userInfo=createContext();
export const userAdress=createContext();



function App() {
  const [cart,setCart]=useState([]);
  const [loggedInUser,setLoggedInUser]=useState([])
  const [adress, setAdress] = useState({ isActive: true });
  return (
    <userInfo.Provider value={[loggedInUser,setLoggedInUser]}>
    <userContext.Provider value={[cart, setCart]}> 
    <userAdress.Provider value={[adress, setAdress]}> 
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
          <Route path='/completed'>
            <OrderCompleted/>
          </Route>
          <Route to='*'>
            <NoMatch/>
          </Route>
          </Switch>
          </Router>
          </userAdress.Provider>
          </userContext.Provider>
           </userInfo.Provider>
           
  );
}

export default App;
