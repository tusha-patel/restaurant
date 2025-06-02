"use client"

import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {

  const [locations, setLocations] = useState([]);
  const [selectLocation, setSelectLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  // for get the location
  const loadLocations = async () => {
    let response = await fetch("https://restaurant-rosy-beta.vercel.app/api/customer/locations");
    response = await response.json();

    if (response.success) {
      setLocations(response.result)
    }
  }

  // for get the restaurant

  const loadRestaurant = async (params) => {
    let url = "https://restaurant-rosy-beta.vercel.app/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant
    }

    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
    }
  }

  useEffect(() => {
    loadLocations();
    loadRestaurant();
  }, []);


  const handleListItem = (item) => {
    setSelectLocation(item);
    setShowLocation(false);
    loadRestaurant({ location: item })
  }




  return (
    <main>
      <CustomerHeader />

      <div className="main-page-banner">
        <div className="">
          <h1>Food delivery app</h1>
          <div className="input-wrappers">
            <input type="text" className="select-input" placeholder="Select place"
              defaultValue={selectLocation} onClick={() => setShowLocation(true)} onChange={(e) => loadRestaurant({ location: e.target.value })} />

            <ul className="location-list" >
              {showLocation &&
                locations.map((item, ind) => (
                  <li key={ind} onClick={() => handleListItem(item)} >{item}</li>
                ))
              }
            </ul>


            <input type="text" className="search-input" onChange={(e) => loadRestaurant({ restaurant: e.target.value })} placeholder="Enter food or restaurant name " />
          </div>
        </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurants.map((item) => (
            <div className="restaurant-wrapper" key={item._id} onClick={() => router.push(`/explore/${item.name}?id=${item._id}`)}  >
              <div className="heading-wrapper" >
                <h2>{item.name}</h2>
                <h5>Contact : {item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city} , </div>
                <div>{item.address}, Email:{item.email} </div>
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </main>
  );
}
