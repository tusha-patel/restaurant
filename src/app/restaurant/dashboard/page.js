"use client"

import React, { useState } from 'react'
import "./../style.css";
import RestaurantHeader from '@/app/_components/RestaurantHeader';
import AddFoodItems from '@/app/_components/AddFoodItems';
import FoodItemList from '@/app/_components/FoodItemList';

const Dashboard = () => {

    const [addItem, setAddItem] = useState(false);

    return (
        <div>
            <RestaurantHeader />
            <div className="dashboard-btn">
                <button onClick={() => setAddItem(true)} >Add Food</button>
                <button onClick={() => setAddItem(false)} >Dashboard</button>
            </div>

            <div className="dashboard-details">
                {addItem ? <AddFoodItems setAddItem={setAddItem} /> : <FoodItemList />}
            </div>


        </div>
    )
}

export default Dashboard