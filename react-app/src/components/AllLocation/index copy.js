import AllLocationCard from "./AllLocationCard";
import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationThunk } from "../../store/location";
import { getAllPostThunk } from "../../store/posts";
import './AllLocation.css'
import LocationCard from "../LocationCard";
import PostCard from "../PostCard";
import { getRandomFromArray } from "../../util";


function AllLocation() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const locations = useSelector((state) => state.locations);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        dispatch(getAllLocationThunk());
        window.scrollTo(0, 0)
    }, [dispatch, user]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoaded(true);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    if (!loaded) {
        return (
            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662133140/Hikinglp/Screen_Recording_2022-09-01_at_17_55_12_MOV_AdobeExpress_y187t2.gif' alt='loading' className='loading' />
        )
    }


    return (
        <div className="all-loc-feed">

            <div className="all-location-container flex">
                {locations && Object.keys(locations).map((key) => {
                    return <AllLocationCard key={key} location={locations[key]} user={user} />
                })}
            </div>

        </div>

    )
}

export default AllLocation;