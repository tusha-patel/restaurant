"use client"


import React, { useState } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import Footer from '../_components/Footer'
import UserSignUp from '../_components/UserSignUp'
import UserLogin from '../_components/UserLogin'

const UserAuth = (props) => {

    const [login, setLogin] = useState(true)
    return (
        <>
            <CustomerHeader />
            <div className="container">
                <h1>{login ? "User Login" : "User SignUp"}</h1>
                {login ? <UserLogin redirect={props.searchParams} /> : <UserSignUp redirect={props.searchParams} />}
                <button onClick={() => setLogin(!login)} className="button-login" >
                    {login ? "Do not have account? SignUp " : "Already have Account? Login"}
                </button>

            </div>
            <Footer />
        </>
    )
}

export default UserAuth