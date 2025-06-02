"use client"

import { useEffect, useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"

const Page = () => {

    const [myOrders, setMyOrders] = useState([]);

    const getMyOrders = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        let response = await fetch(`https://restaurant-rosy-beta.vercel.app/api/order?id=${user._id}`);
        response = await response.json();


        if (response.success) {
            setMyOrders(response.result);
        }
    }

    useEffect(() => {
        getMyOrders();
    }, [])





    return (
        <div className="profile">
            <CustomerHeader />
            <div className="restaurant-list-container">
                {myOrders.map((item, ind) => (
                    <div className="restaurant-wrapper" key={ind}  >
                        <h4>Name: {item.data.name} </h4>
                        <div>Amount : {item.amount} </div>
                        <div>Address :{item.data.address} </div>
                        <div>Status: {item.status} </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    )
}

export default Page