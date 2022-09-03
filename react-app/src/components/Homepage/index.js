import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationThunk } from "../../store/location";
import { getAllPostThunk } from "../../store/posts";
import './Homepage.css'
import LocationCard from "../LocationCard";
import PostCard from "../PostCard";
import { getRandomFromArray } from "../../util";

require('dotenv').config()

function HomePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [loaded, setLoaded] = useState(false);
    const locations = useSelector((state) => state.locations);
    const posts = useSelector((state) => state.posts);

    const helper = async (eventId) => {
        
        const allLocations = await dispatch(getAllLocationThunk());
        const allPosts = await dispatch(getAllPostThunk());
        
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
    let selectedLocations = getRandomFromArray(locationArr, 8);

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