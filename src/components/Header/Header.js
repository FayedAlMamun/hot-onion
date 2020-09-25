import React, { useContext } from 'react';
import './Header.css'
import logo from '../../logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import FoodItems from '../FoodItems/FoodItems';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';



const Header = () => {
    const [cart,setCart]=useContext(userContext);
    return (
        <div>
            <div className="d-flex justify-content-between">
            <img src={logo} width='150px'className='m-4 ml-5' alt=""/>
            <div className="mt-2 p-2 header">
    <Link to ='/order'className='pr-5' ><button disabled={cart.length ? false:true} className=" btn btn-danger"><FontAwesomeIcon icon={faShoppingCart} /><span className='pos'>{cart.length}</span></button></Link>
                <Link to='/login'>Login</Link>
                <Link to='/login' className="pl-5"><button style={{padding:'10px',borderRadius:'10px'}} className=" btn-danger pl-4 pr-4">Sign Up</button></Link>
            </div>
            </div>
            <div className='header-bg '>
        <div className="d-flex justify-content-center">
            <h2 className='mt-5'>Best food waiting for your belly!</h2>
        </div>
        <div className="d-flex justify-content-center">
            <input type="text" name="" id="" placeholder='Search food items'/>
            <button  className='btn btn-danger pl-4 pr-4'>Search</button>
        </div>
        </div>
        <FoodItems></FoodItems>
        </div>
    );
};

export default Header;