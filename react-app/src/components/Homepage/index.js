import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationThunk } from "../../store/location";
import './Homepage.css'


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

    return (
        <div className="homepage">
            
            <div className="location-feed">
                {locationArr.map((location) => {
                    return (
                        <div>
                            {location.name}
                        </div>
                    )})}


            </div>
        </div>    
    )


}

export default HomePage;