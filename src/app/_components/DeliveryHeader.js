import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DeliveryHeader = () => {

    const [order, setOrder] = useState(false);

    const router = useRouter();


    useEffect(() => {
        const res = JSON.parse(localStorage.getItem("delivery"));
        setOrder(res)
    }, [])


    const logout = () => {
        let res = localStorage.removeItem("delivery");
        if (res) {

            router.push("/deliverypartner")
        }
    }


    return (
        <div className="header-wrapper" >
            <Link href={"/"} className="logo">
                <Image height={70} width={100} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" alt="logo image" />
            </Link>
            <div className="">
                <ul>
                    <li> <Link href={"/deliverydashboard"} >Home</Link> </li>
                    {order ?
                        <li><Link href={"/deliverypartner"} onClick={logout} >Logout</Link></li>
                        :
                        <li><Link href={"/deliverypartner"} >Login</Link></li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default DeliveryHeader