import { useRouter } from "next/navigation";
import { useState } from "react"


const RestaurantSignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [c_password, setC_password] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const router = useRouter();
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignup = async () => {

        if (password !== c_password) {
            setPasswordError(true)
            return false;
        } else {
            setPasswordError(false);
        }
        if (!email || !password || !c_password || !name || !city || !address || !contact) {
            setError(true);
            return false;
        } else {
            setError(false)
        }


        let response = await fetch("https://restaurant-rosy-beta.vercel.app/api/restaurant", {
            method: "POST",
            body: JSON.stringify({ email, password, name, city, address, contact })
        });
        response = await response.json();
        if (response.success) {
            alert("User Register successfully ");
            const { result } = response;
            delete result.password;

            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard");
        }
    }

    return (
        <>
            <h3>Signup</h3>
            <div >
                <div className="input-wrapper">
                    <input type="email" name="email" placeholder="Enter email id " className="input-field"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && !email && < span className="input-error">Please Enter valid email</span>}

                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter password " className="input-field"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && !password && < span className="input-error">Please Enter valid password</span>}
                    {passwordError && <span className="input-error">Password and confirm password not match</span>}

                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm password " className="input-field"
                        value={c_password} onChange={(e) => setC_password(e.target.value)}
                    />
                    {error && !c_password && < span className="input-error">Please Enter valid confirm  password</span>}
                    {passwordError && <span className="input-error">Password and confirm password not match</span>}
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Restaurant name " className="input-field"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    {error && !name && < span className="input-error">Please Enter name</span>}
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter City" className="input-field"
                        value={city} onChange={(e) => setCity(e.target.value)}
                    />
                    {error && !city && < span className="input-error">Please Enter City</span>}
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter full address" className="input-field"
                        value={address} onChange={(e) => setAddress(e.target.value)}
                    />
                    {error && !address && < span className="input-error">Please Enter Address</span>}
                </div>
                <div className="input-wrapper">
                    <input type="number" placeholder="Enter Contact No." className="input-field"
                        value={contact} onChange={(e) => setContact(e.target.value)}
                    />
                    {error && !contact && < span className="input-error">Please Enter Contact Number</span>}
                </div>
                <div className="input-wrapper"  >
                    <button className="button" onClick={handleSignup}  >Sign up</button>
                </div>
            </div >
        </>
    )
}

export default RestaurantSignUp