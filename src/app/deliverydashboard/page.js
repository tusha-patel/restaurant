"use client"
import React, { useEffect, useState } from 'react'
import DeliveryHeader from '../_components/DeliveryHeader'
import { useRouter } from 'next/navigation'

const DeliveryDashboard = () => {

    const router = useRouter();

    const [myOrder, setMyOrder] = useState([]);


    useEffect(() => {
        getMyOrders();
    }, []);

    const getMyOrders = async () => {
        const deliveryData = JSON.parse(localStorage.getItem("delivery"));
        console.log(deliveryData);

        if (!deliveryData) {
            return false
        }

        let response = await fetch(`http://localhost:3000/api/deliverypartner/orders/${deliveryData?._id}`)
        response = await response.json();
        if (response.success) {
            setMyOrder(response.result)
        }

    }

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem("delivery"));
        if (!delivery) {
            router.push("/deliverypartner")
        }

    }, []);



    const handleStatusChange = async (item, newStatus) => {
        try {
            // console.log(newStatus);
            console.log(item.status);
            let response = await fetch(`http://localhost:3000/api/order/${item.status}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            response = await response.json();
            console.log(response);
            if (response.success) {
                // Update only the selected order's status
                setMyOrder(prevOrders =>
                    prevOrders.map(order => {
                        console.log();

                        return (
                            order.data._id===item.data._id ? { ...order, status: newStatus } : order
                        )
                    }
                    )
                );
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };


    return (
        <>
            <DeliveryHeader />
            <h1>My order List</h1>
            <div className="" style={{ width: "400px", margin: "20px" }} >
                {
                    myOrder.map((item, ind) => (
                        <div className='restaurant-wrapper' key={ind} style={{ marginBottom: "20px" }} >
                            <h4>Name: {item.data.name} </h4>
                            <div>Amount :{item.amount} </div>
                            <div>Status: {item.status} </div>
                            <div>Update Status:
                                <select value={item.status} onChange={(e) => handleStatusChange(item, e.target.value)}>
                                    <option value="Confirm">Confirm</option>
                                    <option value="On the way">On the way</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Failed to delivery">Failed to delivery</option>
                                </select>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default DeliveryDashboard