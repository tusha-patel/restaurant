"use client"

import CustomerHeader from '@/app/_components/CustomerHeader';
import Footer from '@/app/_components/Footer';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DetailsPage = () => {
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData] = useState();
    const [cartStorage, setCartStorage] = useState([]);
    const [cartIds, setCartIds] = useState([]);
    const [removeCart, setRemoveCartData] = useState();

    const { name } = useParams();
    const searchParams = useSearchParams()

    const loadRestaurantDetails = async () => {
        const id = searchParams.get('id')
        let response = await fetch(`https://restaurant-rosy-beta.vercel.app/api/customer/${id}`);
        response = await response.json();
        if (response.success) {
            setRestaurantDetails(response.details);
            setFoodItems(response.foodItems)
        }
    }

    useEffect(() => {
        loadRestaurantDetails();
    }, []);

    // Load cart data from localStorage after component mounts
    useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];
        setCartStorage(cartFromStorage);
        setCartIds(cartFromStorage.map((item) => item._id));
    }, []);

    // add to cart
    const addToCart = (item) => {
        setCartData(item);
        setCartIds(prev => [...prev, item._id]);
        setRemoveCartData();
    }

    const removeFromCart = (id) => {
        setRemoveCartData(id);
        setCartIds(prev => prev.filter(itemId => itemId !== id));
        setCartData();
    }

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCart} />
            <div className="restaurant-page-banner">
                <h2> {decodeURI(name)}</h2>
            </div>

            <div className='detail-wrapper'>
                <h4>{restaurantDetails?.contact}</h4>
                <h4>{restaurantDetails?.city}</h4>
                <h4>{restaurantDetails?.address}</h4>
                <h4>{restaurantDetails?.email}</h4>
            </div>

            <div className='food-item-wrapper'>
                {foodItems.map((item) => (
                    <div key={item._id} className='list-item'>
                        <img src={item.img_path} alt="food image" />
                        <div className="list-info">
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div className='description'>{item.description}</div>
                            {cartIds.includes(item._id) ? (
                                <button onClick={() => removeFromCart(item._id)}>Remove from cart</button>
                            ) : (
                                <button onClick={() => addToCart(item)}>Add to cart</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    )
}

export default DetailsPage
