"use client"
import "./../../style.css"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'


const EditFoodItems = () => {
    const params = useParams()
    const { id } = params;
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);

    const router = useRouter();


    const handleLoadFoodItem = async () => {
        let response = await fetch(`https://restaurant-rosy-beta.vercel.app/api/restaurant/foods/edit/${id}`);
        response = await response.json();

        if (response.success) {
            setName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.img_path);
            setDescription(response.result.description)
        }
    }


    useEffect(() => {
        handleLoadFoodItem()
    }, []);


    const handleEditFoodItem = async () => {
        if (!name || !price || !path || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }
        let response = await fetch(`https://restaurant-rosy-beta.vercel.app/api/restaurant/foods/edit/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name, price, img_path: path, description })
        });

        response = await response.json();
        if (response.success) {
            alert("Food Item has been Updated");
            // setAddItem(false)
            router.push("../dashboard")
        }
    }


    return (
        <div className="edit-page" >
            <h2>Update New Food Item</h2>
            <div className="form-wrapper">
                <div className="input-wrapper">
                    <input type="text" className="input-field" placeholder="Enter Food Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    {error && !name && <span className="input-error" >Please Enter Food Name</span>}
                </div>
                <div className="input-wrapper">
                    <input type="number" className="input-field" placeholder="Enter Price"
                        value={price} onChange={(e) => setPrice(e.target.value)}
                    />
                    {error && !price && <span className="input-error" >Please Enter Food Price</span>}
                </div>
                <div className="input-wrapper">
                    <input type="text" className="input-field" placeholder="Enter Image Path"
                        value={path} onChange={(e) => setPath(e.target.value)}
                    />
                    {error && !path && <span className="input-error" >Please Enter valid image path</span>}
                </div>
                <div className="input-wrapper">
                    <input type="text" className="input-field" placeholder="Enter Description"
                        value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                    {error && !description && <span className="input-error" >Please Enter description</span>}
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleEditFoodItem} >Edit Food item</button>
                </div>
                <a href="/restaurant/dashboard">Back to Food list</a>
            </div>

        </div>
    )
}

export default EditFoodItems