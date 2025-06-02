"use client"

import Image from "next/image";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const RestaurantHeader = () => {

    const [details, setDetails] = useState();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        let data = localStorage.getItem("restaurantUser");
        if (!data) {
            router.push("/restaurant");
        } else if (data && pathName === "/restaurant") {
            router.push("/restaurant/dashboard")
        } else {
            setDetails(JSON.parse(data))
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("restaurantUser");
        router.push("/restaurant")
    }


    return (
        <div className="header-wrapper" >
            <Link href={"/"} className="">
                <Image height={100} width={150} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" alt="Logo image" />
            </Link>
            <div className="">
                <ul>
                    <li><Link href={"/restaurant/dashboard"} >Home</Link></li>
                    {
                        details && details.name ?
                            <>
                                <li><Link href={"/myProfile"} >Profile</Link></li>
                                <button onClick={handleLogout} >Logout</button>
                            </> :

                            <li><Link href={"/restaurant"} >Login / Signup</Link></li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default RestaurantHeader