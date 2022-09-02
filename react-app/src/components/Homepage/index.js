import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationThunk } from "../../store/location";
import './Homepage.css'
import LocationCard from "../LocationCard";

function HomePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getAllLocationThunk());
        window.scrollTo(0, 0)
    }, [dispatch, user]);

    const locations = useSelector((state) => state.locations);

    if (!locations || Object.keys(locations).length === 0){
        return null
    }

    let locationArr = Object.values(locations);

    console.log(locationArr)

    return (
        <div className="homepage">
            
            <div className="location-feed flex">
                {locationArr.map((location) => {
                    return (
                        <LocationCard key={location.id} location={location} user={user} />
                    )})}


            </div>
        </div>    
    )


}

export default HomePage;