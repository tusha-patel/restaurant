"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import DeliveryHeader from '../_components/DeliveryHeader';

const DeliveryPartner = () => {
    const [loginMobile, setLoginMobile] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)
    const router = useRouter();

    const handleSignUp = async () => {

        let response = await fetch("https://restaurant-rosy-beta.vercel.app/api/deliverypartner/signup", {
            method: "POST",
            body: JSON.stringify({ name, mobile, password, city, address })
        });


        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            router.push("/deliverydashboard")
        } else {
            alert("failed")
        }

    }

    const handleLogin = async () => {
        let response = await fetch(`https://restaurant-rosy-beta.vercel.app/api/deliverypartner/login`, {
            method: "POST",
            body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
        });


        response = await response.json();
        console.log(response);
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            router.push("/deliverydashboard")
        } else {
            alert("faild ! please Enter valid credential ")
        }

    }

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem("delivery"));
        if (delivery) {
            router.push("/deliverydashboard")
        }
    }, [])


    return (
        <div className='delivery' >
            <DeliveryHeader />
            <h2>Delivery partner</h2>
            <div className="auth-container">
                <div className="login-wrapper">
                    <h2>Login Page </h2>
                    <div className="input-wrapper">
                        <input type="text" className='input-field' value={loginMobile} onChange={(event) => setLoginMobile(event.target.value)} placeholder='Enter mobile' />
                    </div>

                    <div className="input-wrapper">
                        <input type="password" className='input-field' value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder='Enter password' />
                    </div>
                    <div className="input-wrapper">
                        <button className='button' onClick={handleLogin} >Login</button>
                    </div>
                </div>
                <div className="line-brake"></div>
                <div className="signup-wrapper">
                    <h2>Signup Page </h2>
                    <div className="input-wrapper" >
                        <input type="text" className='input-field'
                            value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
                        {error && !name && <span className='input-error' > Enter name</span>}
                    </div>
                    <div className="input-wrapper" >
                        <input type="number" className='input-field'
                            value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Enter Mobile' />
                        {error && !mobile && <span className='input-error' > Enter Mobile</span>}
                    </div>
                    <div className="input-wrapper" >
                        <input type="password" className='input-field'
                            value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                        {error && !password && <span className='input-error' > Enter Password</span>}
                        {passwordError && <span className='input-error' >  Password Not Match </span>}
                    </div>
                    <div className="input-wrapper" >
                        <input type="password" className='input-field'
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm password' />
                        {error && !confirmPassword && <span className='input-error' > Enter Password</span>}
                        {passwordError && <span className='input-error' >  Password Not Match </span>}
                    </div>
                    <div className="input-wrapper" >
                        <input type="text" className='input-field'
                            value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City' />
                        {error && !city && <span className='input-error' > Enter city Name</span>}
                    </div>
                    <div className="input-wrapper" >
                        <input type="text" className='input-field'
                            value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' />
                        {error && !address && <span className='input-error' > Enter Address</span>}
                    </div>

                    <div className="input-wrapper" >
                        <button className="button" onClick={handleSignUp} >Sign Up</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeliveryPartner