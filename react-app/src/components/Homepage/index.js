import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationThunk, addLocationThunk } from "../../store/location";
import './Homepage.css'
import LocationCard from "../LocationCard";
import { getRandomFromArray } from "../../util";

require('dotenv').config()

function HomePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [loaded, setLoaded] = useState(false);
    console.log(process.env)

    const helper = async (eventId) => {
        
        // const response = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&api_key=   &limit=4`,{
        //     headers: {
        //         "Authorization": '',
        //     },
        // });
        // if (response.ok) {
        //     const data = await response.json();
        //     for (let i = 0; i < data.data.length; i++) {
        //         let location = {
        //             name: data.data[i].fullName,
        //             details: data.data[i].description,
        //             address: data.data[i].states,
        //             lat: data.data[i].latitude,
        //             lng: data.data[i].longitude,
        //             preview_img: data.data[i].images[0].url,

                    
        //         }
        //         const newLocation = await dispatch(addLocationThunk(location))
        //         console.log(newLocation)
        //     }
   
        //     return data;
        // }

        const allLocation = await dispatch(getAllLocationThunk());
        
    }
    useEffect(() => {
        helper();

        window.scrollTo(0, 0)
        // setLoaded(true);
    }, [dispatch, user]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoaded(true);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    const locations = useSelector((state) => state.locations);


    if (!locations || Object.keys(locations).length === 0){
        return null
    }

    let locationArr = Object.values(locations);
    if (!locationArr || locationArr.length === 0){
        return null
    }

    if (!loaded){
        return (
            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662133140/Hikinglp/Screen_Recording_2022-09-01_at_17_55_12_MOV_AdobeExpress_y187t2.gif' alt='loading' className='loading'/>
        )
    }
    let selectedLocations = getRandomFromArray(locationArr, 8);

    return (
        <div className="homepage flex">
            
            <div className="location-feed flex">
                {selectedLocations.map((location) => {
                    return (
                        <LocationCard key={location.id} location={location} />
                    )})}


            </div>
        </div>    
    )


}

export default HomePage;