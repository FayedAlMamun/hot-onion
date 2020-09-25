import React, { useContext } from 'react';
import { userAdress, userInfo } from '../../App';
import google from '../../Image/google.png'
import group from '../../Image/Group 1151.png'
import icon from '../../Image/Group 1152.png'
import './OrderCompleted.css'
const OrderCompleted = () => {
    const [loggedInUser,setLoggedInUser]=useContext(userInfo);
    const [adress, setAdress]=useContext(userAdress)
    console.log(loggedInUser)
    return (
        <div>
            <div className='d-flex  justify-content-center'>
            <h5 className='ml-2 mt-5'>Breakfast</h5>
            <h5 className='ml-2 mt-5'>Lunch</h5>
            <h5 className='ml-2 mt-5'>Dinner</h5>
        </div>
        <div className="d-flex mt-5 ">
            <div className="col-md-6 ml-5">
                <img src={google} className='img-fluid h-75' alt=""/>
            </div>
            <div className="col-md-6 ml-5 ">
                <div className="bg-gray p-4 " style={{width:'15rem'}}>
                    <img src={group} height='100px' alt=""/>
                    <div className="bg-white pl-2 pb-1 ">
                        <p>{loggedInUser.name}</p>
                        <p>Your Location</p>
                        <small className="text-muted">{adress.adress}</small>
                        <p>Shop Adress</p>
                        <small className="text-muted">Gulshan Hot onion restaurent</small>
                    </div >
                    <h5 className='mt-2'>09:30</h5>
                    <p className="text-muted"><small>Estimated Delivary Time </small></p>
                    <div className="row m-1 p-1 bg-white">
                        <div className="col-md-4">
                        <img src={icon} height='60px' alt=""/>
                        </div>
                        <div className="col-md-8">
                        <p className='m-2'>Hamim</p>
                        <p><small className="ml-2 text-muted">Your raider</small></p>
                        </div>
                        
                    </div>
                    <button className="btn-danger mt-2 contact">Contact</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default OrderCompleted;