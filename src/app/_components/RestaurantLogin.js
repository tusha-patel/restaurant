"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"


const RestaurantLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true)
            return false;
        } else {
            setError(false);
        }


        let response = await fetch("https://restaurant-rosy-beta.vercel.app/api/restaurant", {
            method: "POST",
            body: JSON.stringify({ email, password, login: true })
        });

        response = await response.json();
        if (response.success) {
            alert("Login successful");
            const { result } = response;
            delete result.password;
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard");
        } else {
            alert("Login failed, Please Enter valid credential ")
        }
    }


    return (
        <>
            <h3>Login Component</h3>
            <div className="" >
                <div className="input-wrapper" >
                    <input type="email" name="email" placeholder="Enter email id " className="input-field"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && !email && <span className="input-error" >Please Enter valid email</span>}
                </div>
                <div className="input-wrapper" >
                    <input type="password" placeholder="Enter password" className="input-field"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && !password && <span className="input-error" >Please Enter Valid Password</span>}
                </div>
                <div className="input-wrapper" >
                    <button className="button" onClick={handleLogin} >Login</button>
                </div>
            </div>
        </>
    )
}

export default RestaurantLogin