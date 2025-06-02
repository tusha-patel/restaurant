"use client"

import { useState } from "react"
import RestaurantHeader from "../_components/RestaurantHeader"
import RestaurantLogin from "../_components/RestaurantLogin"
import RestaurantSignUp from "../_components/RestaurantSignUp"
import "./style.css"
import Footer from "../_components/Footer"

const Restaurant = () => {
    const [login, setLogin] = useState(true)


    return (
        <div>
            <RestaurantHeader />
            <div className="container" >
                <h1> Restaurant login / signup page</h1>
                {
                    login ? <RestaurantLogin /> : <RestaurantSignUp />
                }
                <button onClick={() => setLogin(!login)} className="button-login" >
                    {login ? "Do not have account? SignUp " : "Already have Account? Login"}
                </button>
            </div>
            <Footer />
        </div>
    )
}

export default Restaurant