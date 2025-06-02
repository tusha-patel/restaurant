"use client"

import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader';
import { DELIVERY_CHARGES, TAX } from '../lib/constant';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0); // Changed to number
    const router = useRouter();

    useEffect(() => {
        try {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (!cart || cart.length === 0) {
                console.log("Cart is empty");
                router.push("/");
                return;
            }

            setCartStorage(cart);

            const calculatedTotal = cart.reduce((sum, item) => sum + item.price, 0);
            setTotal(calculatedTotal);
        } catch (error) {
            console.error("Error processing cart:", error);
            setCartStorage([]);
            setTotal(0);
        }
    }, []); // Add router if you uncomment the push

    const orderNow = () => {
        try {
            if (JSON.parse(localStorage.getItem("user"))) {
                router.push("/order");
            } else {
                router.push("/user-auth?order=true");
            }
        } catch (error) {
            console.error("Error in orderNow:", error);
        }
    }

    const removeFromCart = (id) => {
        try {
            const res = JSON.parse(localStorage.getItem("cart")) || [];
            let result = res.filter((item) => item._id !== id);

            setCartStorage(result);
            localStorage.setItem("cart", JSON.stringify(result));
            if (result.length === 0) {
                router.push("/");
            }

            // Update total after removal
            setTotal(result.reduce((sum, item) => sum + item.price, 0));
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    }


    return (
        <div>
            <CustomerHeader />
            <div className="food-item-wrapper">
                {cartStorage &&
                    cartStorage.length > 0 ? cartStorage.map((item) => (
                        <div className='list-item' key={item._id} >
                            <img src={item.img_path} alt="image" />
                            <div className="cart-item">
                                <div className="list-info">
                                    <div>{item.name}</div>
                                    <div className='description'>{item.description}</div>
                                    <button onClick={() => removeFromCart(item._id)}>Remove from cart</button>
                                </div>
                                <div>Price : ₹ {item.price} </div>
                            </div>
                        </div>
                    )) :
                    <p>Cart not found</p>
                }
            </div>
            <div className="total-wrapper">
                <div className="">
                    <div className="row">
                        <span>Food Charges:</span>
                        <span>₹ {total} </span>
                    </div>
                    <div className="row">
                        <span>Tax :   </span>
                        <span>₹ {total * TAX / 100} </span>
                    </div>
                    <div className="row">
                        <span>Delivery Charge : </span>
                        <span>₹  {DELIVERY_CHARGES} </span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>₹ {total + DELIVERY_CHARGES + (total * TAX / 100)} </span>
                    </div>
                </div>
                <div className="">
                    <button className='button' onClick={orderNow} >Order Now</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage 