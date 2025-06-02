import { useState } from "react"

const AddFoodItems = ({ setAddItem }) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    const handleAddFoodItem = async () => {
        if (!name || !price || !path || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }
        let restaurantId;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if (restaurantData) {
            restaurantId = restaurantData._id;
        }

        let response = await fetch("https://restaurant-rosy-beta.vercel.app/api/restaurant/foods", {
            method: "POST",
            body: JSON.stringify({ name, price, img_path: path, description, restaurant_id: restaurantId })
        });

        response = await response.json();
        if (response.success) {
            alert("Food item added");
            setAddItem(false)
        }
    }


    return (
        <div>
            <h1>Add New Food Item</h1>
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
                    <button className="button" onClick={handleAddFoodItem} >Add Food</button>
                </div>
            </div>

        </div>
    )
}

export default AddFoodItems