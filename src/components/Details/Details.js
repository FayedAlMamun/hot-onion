import React, { useContext, useState } from 'react';
import {useParams } from 'react-router-dom';
import FakeData from '../../FakeData/food'
import './Details.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare,  faPlusSquare,} from '@fortawesome/free-solid-svg-icons'
const Details = () => {
    const {id}=useParams();
    const item=FakeData.filter(food=>food.id==id);
    //const [menu,setMenu]=useContext(userContext);
    //console.log(item)
    const [cart,setCart]=useState([]);
    
    const handleAdd=(e)=>{
       item.map(i=>{setCart([...cart,i])})
       console.log(cart)
       
    }
  
    console.log(cart)
    
    return (
        <div>
        <div className='d-flex justify-content-center mt-4'>
           {
               item.map(item=>{
                   
                   return([
                  <div className='d-flex mt-5'>
                      <h5 className='mr-2'>{item.catagory}</h5>
                   <div>{item.catagory=='Breakfast'? <p>Lunch Dinner</p>:<p></p>}</div>
                   <div>{item.catagory=='Lunch'? <p>Breakfast Dinner</p>:<p></p>}</div>
                   <div>{item.catagory=='Dinner'? <p>Breakfast Lunch </p>:<p></p>}</div>
                   
                  </div>
                   ])
               })
           }
            </div>
          {
              item.map(i=>{
                  return([
                      <div className="row margin">
                          <div className="col-md-6">
                            <h4 className='m'>{i.title}</h4>
                            <p className='m'>{i.description}</p>
                            <p className='m'>${i.price}</p>
                            <button onClick={handleAdd} className='btn btn-danger pl-4 pr-4 m'>Add</button>
                             <button><FontAwesomeIcon icon={faPlusSquare} /></button>                              
                            <input className='food-quantity' type="text" name="" id=""/>
                            <button><FontAwesomeIcon icon={faMinusSquare} /></button>   
                          </div>
                          <div className="col-md-6">
                                <img className='w-50' src={i.item} alt=""/>
                          </div>
                      </div>
                  ])
              })
          }    
           </div>
            
        
    );
};

export default Details;