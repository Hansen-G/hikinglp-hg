import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationThunk } from "../../store/location";
import './Homepage.css'
import LocationCard from "../LocationCard";

function HomePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(getAllLocationThunk());
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
            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662069599/Hikinglp/Screen_Recording_2022-09-01_at_17.55.12_pbosdp.gif' alt='loading' className='loading'/>
        )
    }
    return (
        <div className="homepage">
            
            <div className="location-feed flex">
                {locationArr.map((location) => {
                    return (
                        <LocationCard key={location.id} location={location} />
                    )})}


            </div>
        </div>    
    )


}

export default HomePage;