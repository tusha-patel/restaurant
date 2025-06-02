import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const FoodItemList = () => {

    const [foodItems, setFoodItems] = useState([]);
    const router = useRouter();


    const loadFoodItem = async () => {
        const id = JSON.parse(localStorage.getItem("restaurantUser"));
        console.log(id);

        if (!id) {
            alert("please first login with Restaurant id ")
            return false;
        } else {
            let response = await fetch(`https://restaurant-rosy-beta.vercel.app/api/restaurant/foods/${id?._id}`);
            response = await response.json();
            console.log(response);
            if (response.success) {
                setFoodItems(response.result);
            } else {
                alert("food item list not loading")
            }
        }
    }
    useEffect(() => {
        loadFoodItem()
    }, []);

    const deleteFoodItem = async (id) => {
        console.log(id);

        let response = await fetch(`https://restaurant-rosy-beta.vercel.app/api/restaurant/foods/${id}`, {
            method: "delete"
        });
        response = await response.json();
        console.log(response);

        if (response) {
            alert("food item delete successful");
            loadFoodItem()
        }
    }

    return (
        <div className="" >
            <table>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems && foodItems.map((item, ind) => (
                        <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                            <td> <img src={item.img_path} alt={item.name} /> </td>
                            <td>
                                <button onClick={() => deleteFoodItem(item._id)} >Delete</button>
                                <button onClick={() => router.push(`/restaurant/dashboard/${item._id}`)} >Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FoodItemList