import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const UserSignUp = ({ redirect }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false)

    const router = useRouter();


    const handleSignUp = async () => {

        if (password !== confirmPassword) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }

        if (!name || !email || !password || !confirmPassword || !city || !address || !mobile) {
            setError(true)
            return false
        } else {
            setError(false)
        }


        let response = await fetch("https://restaurant-rosy-beta.vercel.app/api/user", {
            method: "POST",
            body: JSON.stringify({ name, email, password, city, address, mobile })
        });

        response = await response.json();
        console.log(response);

        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("user", JSON.stringify(result));
            if (redirect) {
                router.push("/order  ");
            } else {
                router.push("/");
            }
        } else {
            alert("failed")
        }
    }

    return (
        <div className='' >
            <div className="input-wrapper" >
                <input type="text" className='input-field'
                    value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' />
                {error && !name && <span className='input-error' > Enter name</span>}
            </div>
            <div className="input-wrapper" >
                <input type="text" className='input-field'
                    value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                {error && !email && <span className='input-error' > Enter email</span>}
            </div>
            <div className="input-wrapper" >
                <input type="text" className='input-field'
                    value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                {error && !password && <span className='input-error' > Enter Password</span>}
                {passwordError && <span className='input-error' >  Password Not Match </span>}
            </div>
            <div className="input-wrapper" >
                <input type="text" className='input-field'
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
                <input type="number" className='input-field'
                    value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder='Enter Mobile' />
                {error && !mobile && <span className='input-error' > Enter Mobile</span>}
            </div>
            <div className="input-wrapper" >
                <button className="button" onClick={handleSignUp} >Sign Up</button>
            </div>
        </div>
    )
}

export default UserSignUp