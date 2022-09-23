import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationThunk } from "../../store/location";
import { getAllPostThunk } from "../../store/posts";
import './Homepage.css'
import { Link } from 'react-router-dom';
import LocationCard from "../LocationCard";
import PostCard from "../PostCard";
import { getRandomFromArray } from "../../util";
import AI from '../AI'
import ButtomBar from '../ButtomBar'

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

    const getLocation = async () => {
        if (!navigator.geolocation) {
            setStatus(false);
            setLoaded(true)
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(true);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                setLoaded(true)
            }, () => {
                setStatus(false);
                setLoaded(true)
            });
        }
    }
    

    const helper = async (eventId) => {

        const allLocations = await dispatch(getAllLocationThunk());
        const allPosts = await dispatch(getAllPostThunk());
        const currentLocation = await getLocation();
        // const setDisplay = await setLoaded(true);
    }

    useEffect(() => {
        helper();
        window.scrollTo(0, 0)
    }, [dispatch, user]);



    let locationArr = Object.values(locations);
    let postArr = Object.values(posts).sort(function (a, b) {
        return new Date(b["createdAt"]) - new Date(a["createdAt"]);
    });
    let sellectedPost = postArr.slice(0, 12);

    

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
        selectedLocations = locationArr.slice(0, 12)
    } else {
        selectedLocations = getRandomFromArray(locationArr, 12);
    }


    return (
        <div className="homepage">
            <div className="home-title">
                <h1>
                    <span className='h1-span'>Suggested Hiking Place for you</span>
                </h1>

                <h2>
                    <Link to='/locations/all' className="home-h2-link">
                        <span className='h2-span'>All locations</span>
                    </Link>
                   
                </h2>
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
                {sellectedPost.map((post) => {
                    if (post){
                        return (
                            <PostCard key={post.id} post={post} HomePage={true} />
                        )
                    } 
                })}


            </div>
            <AI />
            <ButtomBar />
        </div>    
    )


}

export default HomePage;