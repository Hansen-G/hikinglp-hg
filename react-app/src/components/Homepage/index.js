import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationThunk } from "../../store/location";
import { getAllPostThunk } from "../../store/posts";
import './Homepage.css'
import LocationCard from "../LocationCard";
import PostCard from "../PostCard";
import { getRandomFromArray } from "../../util";

require('dotenv').config()

function distance (lat1, lng1, lat2, lng2){
    return Math.sqrt((lat1 - lat2) ** 2 + (lng1 - lng2) ** 2)
}

function HomePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [loaded, setLoaded] = useState(false);
    const locations = useSelector((state) => state.locations);
    const posts = useSelector((state) => state.posts);

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(false);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus(false);
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(true);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus(false);
            });
        }
    }
    

    const helper = async (eventId) => {
        
        const allLocations = await dispatch(getAllLocationThunk());
        const allPosts = await dispatch(getAllPostThunk());
        const currentLocation = await getLocation();
        
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

    


    // if (!locations || Object.keys(locations).length === 0){
    //     return null
    // }

    // if (!posts || Object.keys(posts).length === 0) {
    //     return null
    // }

    let locationArr = Object.values(locations);
    let postArr = Object.values(posts);

    

    if (!loaded){
        return (
            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662133140/Hikinglp/Screen_Recording_2022-09-01_at_17_55_12_MOV_AdobeExpress_y187t2.gif' alt='loading' className='loading'/>
        )
    }
    
    let selectedLocations

    if (status){
        locationArr.sort((a, b) => {
            return distance(lat, lng, a.lat, a.lng) - distance(lat, lng, b.lat, b.lng)
        })
        selectedLocations = locationArr.slice(0, 8)
    } else {
        selectedLocations = getRandomFromArray(locationArr, 8);
    }


    return (
        <div className="homepage">
            <div className="home-title flex">
                <h1>
                    <span className='h1-span'>Suggested Hiking Place for you</span>
                </h1>
            </div>

            
            
            <div className="location-feed flex">
                {selectedLocations.map((location) => {
                    return (
                        <LocationCard key={location.id} location={location} />
                    )})}


            </div>

            <div className="home-title flex">
                <h1>
                    <span className='h1-span'>Recent Activity</span>
                </h1>
            </div>



            <div className="post-feed flex">
                {postArr.map((post) => {
                    return (
                        <PostCard key={postArr.id} post={post} />
                    )
                })}


            </div>
        </div>    
    )


}

export default HomePage;