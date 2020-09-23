import React, { useContext, useEffect, useState } from 'react';
import './FoodItems.css'
import FakeData from '../../FakeData/food'
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
const FoodItems = () => {
    const [foodItem,setFoodItem]=useState('Lunch')
    const [menu,setMenu]=useContext(userContext);
    const handleBreakfast=()=>{
    const breakfastMenu=FakeData.filter(food=>food.catagory==='Breakfast');
    setMenu(breakfastMenu);
    setFoodItem('Breakfast')
   
    }
    const handleLunch=()=>{
        const LunchMenu=FakeData.filter(food=>food.catagory==='Lunch');
        setMenu(LunchMenu);
        setFoodItem('Lunch')
    }
    const handleDinner=()=>{
        const dinnerMenu=FakeData.filter(food=>food.catagory==='Dinner');
        setMenu(dinnerMenu);
        setFoodItem('Dinner')
    }
    useEffect(()=>{
        const LunchMenu=FakeData.filter(food=>food.catagory==='Lunch');
        setMenu(LunchMenu);
       

    },[])
    return (
        <div>
            <div className="d-flex justify-content-center">
                <p onClick={handleBreakfast} className={foodItem=='Breakfast'?'activeItem':'foodItem'}>Breakfast</p>
                <p  onClick={handleLunch} className={foodItem=='Lunch'?'activeItem':'foodItem'}>Lunch</p>
                <p onClick={handleDinner}  className={foodItem=='Dinner'?'activeItem':'foodItem'}>Dinner</p>
            </div>
           <div className="row  ml-5">
           {
                menu.map(item=>{
                    return([
                   <div className="col-12 col-sm-6 col-md-4 pl-5 ">
                       <div style={{width:'15rem'}}>
                       <Link to={'/detail/'+item.id}><img className='card-img-top' src={item.item} alt=""/></Link>
                       <div>
                        <h5 className='mt-4  text-center'>{item.title}</h5>
                        <p className="mt-4 text-center">{item.detail}</p>
                        <p className='mt-4 text-center'>${item.price}</p>
                
                       </div>
                       </div>
                    </div>
                        
                    ])
                })
            }
        
           </div>
        <div className="text-center mb-5 mt-5">
            <button className='btn btn-danger pl-4 pr-4'>Checkout YOur Food</button>
        </div>
        </div>
    );
};

export default FoodItems;