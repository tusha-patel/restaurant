import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const UserLogin = ({ redirect }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true);
            return false
        } else {
            setError(false);
        }


        let response = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        response = await response.json();
        console.log(response);

        if (response.success) {

            const { result } = response;
            delete result.password;
            localStorage.setItem("user", JSON.stringify(result));
            if (redirect) {
                router.push("/order")
            } else {
                router.push("/")
            }
        } else {
            alert("Something want wrong please try again")
        }


    }


    return (
        <div className='' >
            <div className="input-wrapper">
                <input type="email" placeholder='Enter your email' className='input-field'
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                {error && !email && <span className='input-error' > Please Enter Email</span>}
            </div>
            <div className="input-wrapper">
                <input type="password" placeholder='Enter Password' className='input-field'
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && !password && <span className='input-error' > Enter Password</span>}
            </div>
            <div className="input-wrapper">
                <button className='button' onClick={handleLogin} >Login</button>
            </div>
        </div>
    )
}

export default UserLogin