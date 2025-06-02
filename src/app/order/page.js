"use client"

import React, { useEffect, useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import Footer from '../_components/Footer'
import { DELIVERY_CHARGES, TAX } from '../lib/constant'
import { useRouter } from 'next/navigation'

const Order = () => {
    const [total, setTotal] = useState("");
    const [userStorage, setUserStorage] = useState([]);
    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserStorage(user);
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (!cart) {
            router.push("/")
        }
        let price = cart && cart.length === 1 ? cart[0].price : cart && cart?.reduce((a, b) => {
            return a.price + b.price;
        });
        setTotal(price);

    }, []);


    // place your order
    const orderNow = async () => {
        let user_id = JSON.parse(localStorage.getItem("user"))._id;
        let city = JSON.parse(localStorage.getItem("user")).city;
        let cart = JSON.parse(localStorage.getItem("cart"));
        let foodItemIds = cart.map((item) => item._id).toString();
        // let deliveryBoy_id = "6815aafe2c1daa9d550c45b2";

        let deliveryBoyResponse = await fetch(`https://restaurant-rosy-beta.vercel.app/api/deliverypartner/${city}`)
        deliveryBoyResponse = await deliveryBoyResponse.json();

        let deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id);

        let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

        if (!deliveryBoy_id) {
            alert("Delivery partner not avilable")
            return false;
        }




        let restaurant_id = cart[0].restaurant_id;


        let collection = {
            user_id,
            restaurant_id,
            foodItemIds,
            deliveryBoy_id,
            status: "confirm",
            amount: total + DELIVERY_CHARGES + (total * TAX / 100),
        }

        let response = await fetch("https://restaurant-rosy-beta.vercel.app/api/order", {
            method: "POST",
            body: JSON.stringify(collection)
        });

        response = await response.json();
        if (response.success) {
            alert("Order confirmed");
            setRemoveCartData(true)
            router.push("/myProfile")
        } else {
            alert("order failed")
        }
    }


    return (
        <div className='order'>
            <CustomerHeader removeCartData={removeCartData} />

            <h1>Order Details</h1>
            <div className="total-wrapper">
                <div className="">
                    <h2>user Details</h2>
                    <div className="row">
                        <span>Name:</span>
                        <span>{userStorage?.name} </span>
                    </div>
                    <div className="row">
                        <span>Address:</span>
                        <span>{userStorage?.address} </span>
                    </div>
                    <div className="row">
                        <span>Mobile:</span>
                        <span>{userStorage?.mobile} </span>
                    </div>
                    <h2>Amount Details</h2>
                    <div className="row">
                        <span>Tax :   </span>
                        <span>₹ {total * TAX / 100} </span>
                    </div>
                    <div className="row">
                        <span>Delivery charge : </span>
                        <span>₹  {DELIVERY_CHARGES} </span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>₹ {total + DELIVERY_CHARGES + (total * TAX / 100)} </span>
                    </div>
                    <h2>Payment Methods </h2>
                    <div className="row">
                        <span>Cash on Delivery : </span>
                        <span>₹ {total + DELIVERY_CHARGES + (total * TAX / 100)} </span>
                    </div>
                </div>
                <div className="">
                    <button className='button' onClick={orderNow} >Place Your Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Order