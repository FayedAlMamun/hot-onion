import React, { useContext} from 'react';
import { userAdress, userContext } from '../../App';
import './OrderPlaced.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare,  faPlusSquare,} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const OrderPlaced = () => {
    const [cart, setCart] = useContext(userContext);
    let unique = [...new Set(cart)];
    const [adress, setAdress]=useContext(userAdress)
    console.log(adress)
    const handleBlur = (e) => {
        const newAdress = { ...adress };
        newAdress.isActive = true;
        newAdress[e.target.name] = e.target.value;
        setAdress(newAdress);
    }
    // console.log(adress)
    const handleSumit = (e) => {
        const newAdress = { ...adress }
        newAdress.isActive = false;
        console.log(newAdress)
        setAdress(newAdress);
        e.preventDefault();

    }
    const plusOne=(id)=>{
        let v=parseInt(document.getElementById(id).value);
        v=v+1;
        document.getElementById(id).value=v;
        const newItem=unique.find(i=>i.id==id);
        newItem.quantity=document.getElementById(id).value;
        unique=[...unique,newItem]
        setCart(unique);
    }
    console.log(unique)
    const minusOne=(id)=>{
        let v=parseInt(document.getElementById(id).value);
        v=v-1;
        v>0?document.getElementById(id).value=v:document.getElementById(id).value=0;
        const newItem=unique.find(i=>i.id==id);
        newItem.quantity=document.getElementById(id).value;
        unique=[...unique,newItem]
        setCart(unique);
    }
    const total = unique.reduce((total, prod) => total + prod.price * prod.quantity, 0);
    const delivaeryCharge = total / 10;
    const grandTotal = total + Number(delivaeryCharge.toFixed(2));
    return (
        <div>
            <div className="row  ">
                <div className="col-md-6 text-center mt-4">
                    <div>
                        <form onSubmit={handleSumit} className=''>
                            <input className='delivaryDetails' disabled value='Edit Delivary Details' placeholder='' type="text" /><br /><br />
                            <input onBlur={handleBlur} className='delivaryDetails' placeholder='Your City' type="text" required name='adress' /><br /><br />
                            <input onBlur={handleBlur} className='delivaryDetails' placeholder='Road no' type="text" required name='roadNo' /><br /><br />
                            <input className='delivaryDetails' placeholder='Falt,suite or floor' type="text" required /><br /><br />
                            <input className='delivaryDetails' placeholder='Business name' type="text" /><br /><br />
                            <input className='delivaryDetails' placeholder='Add deliver instructor' type="text" /><br /><br />
                            <input className='delivaryDetails btn-danger' value='Save & Continue' type='submit' />
                        </form>
                    </div>
                </div>
                <div className="col-md-6  mt-5">
                    <h6><span style={{ fontWeight: '100' }}>From </span>Red Onion Restaurent!</h6>
                    <p>Your adress is given below!</p>
                    <p>Your City:{adress.adress}</p>
                    <p>Road No:{adress.roadNo}</p>
                    {
                        unique.map(i => {
                            return ([
                                <div>
                                    <div className="d-flex align-items-center cart mt-4 " style={{ width: '27rem' }}>
                                        <img className='m-1' src={i.item} height='100px' alt="" />
                                        <p className='m-1' >{i.title}</p>
                                        <h5 className='m-1' style={{ color: 'red' }}>${i.price * i.quantity}</h5>
                                        <button><FontAwesomeIcon onClick={()=>minusOne(i.id)} icon={faMinusSquare} /></button>                            
                                        <input className='food-quantity' type="number" value={i.quantity}  id={i.id}/>
                                        <button><FontAwesomeIcon onClick={()=>plusOne(i.id)} icon={faPlusSquare} /></button>  
                                    </div>
                                </div>
                            ])
                        })
                    }
                    <div className='mt-5'>
                        <div className="d-flex mt-2">
                            <p className='m-1'>Subtotal</p>
                            <p className='m-1'>{unique.length} item</p>
                            <p style={{ color: 'red' }} className='m-1'>${total}</p>
                        </div>
                        <div className="d-flex mt-2">
                            <p className='m-1'>Tax</p>
                            <p className='m-1'>{unique.length} item</p>
                            <p style={{ color: 'red' }} className='m-1'>${delivaeryCharge}</p>
                        </div>
                        <div className="d-flex mt-2">
                            <p className='m-1'>Total</p>
                            <p className='m-1'>{unique.length} item</p>
                            <h4 style={{ color: 'red' }} className='m-1'>${grandTotal}</h4>
                        </div>
                    </div>
                    <Link to='completed'><button disabled={adress.isActive} className="cart-btn btn-danger">Place Order</button></Link>

                </div>
            </div>
        </div>
    );
};

export default OrderPlaced;