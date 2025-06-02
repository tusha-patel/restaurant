
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const CustomerHeader = (props) => {

    const [user, setUser] = useState([]);
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState();
    const router = useRouter();
    useEffect(() => {
        // Runs only on client
        const cartStorage = localStorage.getItem('cart');
        if (cartStorage) {
            const parsedCart = JSON.parse(cartStorage);
            setCartItem(parsedCart);
            setCartNumber(parsedCart.length);
        }
        const userStorage = JSON.parse(localStorage.getItem("user"));
        setUser(userStorage)

    }, []);



    useEffect(() => {
        if (props.cartData) {
            if (cartNumber) {
                if (cartItem[0].restaurant_id != props.cartData.restaurant_id) {
                    localStorage.removeItem('cart');
                    setCartNumber(1);
                    setCartItem([props.cartData])
                    localStorage.setItem('cart', JSON.stringify([props.cartData]))

                } else {
                    let localCartItem = cartItem;
                    localCartItem.push(JSON.parse(JSON.stringify(props.cartData)))
                    setCartItem(localCartItem);
                    setCartNumber(cartNumber + 1)
                    localStorage.setItem('cart', JSON.stringify(localCartItem))
                }
            } else {
                setCartNumber(1)
                setCartItem([props.cartData])
                localStorage.setItem('cart', JSON.stringify([props.cartData]))
            }
        }

    }, [props.cartData]);

    useEffect(() => {
        if (props.removeCartData) {
            let localCartItem = cartItem.filter((item) => {
                return item._id !== props.removeCartData
            });


            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem("cart", JSON.stringify(localCartItem));

            if (localCartItem.length === 0) {
                localStorage.removeItem("cart")
            }
        }
    }, [props.removeCartData]);


    useEffect(() => {
        if (props.removeCartData) {
            setCartItem([]);
            setCartNumber(0);
            localStorage.removeItem("cart");
        }
    }, [props.removeCartData])

    // for logout

    const logout = () => {
        localStorage.removeItem("user");
        router.push("/user-auth")
    }



    return (
        <div className="header-wrapper" >
            <Link href={"/"} className="logo">
                <Image height={80} width={100} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" alt="logo image" priority
                />
            </Link>
            <div className="nav-items  ">
                <ul>
                    <li> <Link href={"/"} >Home</Link> </li>
                    {
                        user ? <>
                            <li><Link href={"/#"} >{user?.name}</Link></li>
                            <button onClick={logout} >Logout</button>
                        </> : <>
                            <li> <Link href={"/user-auth"} >Login</Link> </li>
                            <li> <Link href={"/user-auth"} >SignUp</Link> </li>
                        </>
                    }
                    <li> <Link href={`${cartNumber ? "/cart" : "#"}`} >cart({cartNumber}) </Link> </li>
                    <li> <Link href={"/restaurant"} >Add Restaurant</Link> </li>
                    <li> <Link href={"/deliverypartner"} >Delivery partner</Link> </li>
                </ul>
            </div>
        </div>
    )
}

export default CustomerHeader