import React, { useContext,useState} from 'react';
import {useParams } from 'react-router-dom';
import FakeData from '../../FakeData/food'
import './Details.css'

import { userContext } from '../../App';

const Details = () => {
    const [isAdded,setIsAdded]=useState(false)
    const [cart,setCart]=useContext(userContext);
    const {id}=useParams();
    const item=FakeData.find(food=>food.id==id);
    const handleAdd=()=>{
        setCart([...cart,item])
        setIsAdded(true)
      
    }

    console.log(cart)
    
    return (
        <div>
        <div className='d-flex justify-content-center mt-4'>
           {
                  <div className='d-flex mt-5'>
                      <h5 className='mr-2'>{item.catagory}</h5>
                   <div>{item.catagory=='Breakfast'? <p>Lunch Dinner</p>:<p></p>}</div>
                   <div>{item.catagory=='Lunch'? <p>Breakfast Dinner</p>:<p></p>}</div>
                   <div>{item.catagory=='Dinner'? <p>Breakfast Lunch </p>:<p></p>}</div>
                   
                  </div>
           }
            </div>
          {
            
                      <div className="row margin">
                          <div className="col-md-6">
                            <h4 className='m'>{item.title}</h4>
                            <p className='m'>{item.description}</p>
                            <p className='m'>${item.price}</p>
          <button onClick={handleAdd} className='btn btn-danger pl-4 pr-4 m'>{isAdded ? 'Added' :'Add to Cart' }</button>
                          </div>
                          <div className="col-md-6">
                                <img className='w-50' src={item.item} alt=""/>
                          </div>
                      </div>
                  
              
          }    
     
           </div>
            
        
    );
};

export default Details;