import './LocationDetails.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import { getALocatuinThunk, editLocationThunk } from '../../store/location';
import { pastDate } from "./../../util";

function postNumber(arr) {
    if (!arr) {
        return 0
    }
    return arr.length
    
}

function LocationDetails () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { locationId } = useParams();

    const location = useSelector((state) => state.locations[locationId]);
    const user = useSelector((state) => state.session.user);


    const helper = async (locationId) => {
        const location = await dispatch(getALocatuinThunk(locationId));
    }

    useEffect(() => {
        helper(locationId);
    }, [locationId]);




    if (!location || Object.keys(location).length === 0){
        return null
    }


    return (
        <div>
            <div className='loc-d-header'>
                <div>
                    <img src={location.preview_img} alt={location.name} className='loc-d-bg'/>
                </div>
                <div className='loc-d-info'>
                    <h1>{location.name}</h1>
                    <div>{postNumber(location.posts)} posts</div>
                    <div>{location.address} </div>
                    <div>Latitude: {location.lat}, Longitude: {location.lng}</div> 
                    
                
                </div>

            </div>
            <div className='loc-d-main'>
                <div className='loc-map Poppins main-div'>
                    <h2 className='loc-map-title title'>Location & Hours</h2>
                    <div className='loc-map-add loc-main'>{location.address}</div>

                </div>

                <div className='loc-about Poppins main-div'>
                    <h2 className='loc-about-title title'>About the Location</h2>
                    <div className='loc-main'>{location.details}</div>

                </div>

                <div className='loc-about Poppins main-div'>
                    <h2 className='loc-about-title title'>Recommended Postes</h2>
                    {location.posts.map((post) => {
                        return (
                            <div className='loc-post-card'>
                                <div className='loc-post-card-user flex'>
                                    <div className='user-img-div'>
                                        <img src={post.user.profile_img} alt={post.user.name} className='user-img'/>
                                    </div>
                                    <div className='user-info'>
                                        <div className='user-name'>{post.user.name}</div>
                                    </div>

                                </div>
                                <div className='loc-post-card-time'>
                                    <div>{pastDate(post.createdAt)}</div>
                                </div>

                                <div className='loc-post-card-post'>
                                    <div>{post.post}</div>
                                </div>

                                <div className='loc-post-card-img'>
                                    <img src={post.preview_img} alt={post.post} className='post-img'/>
                                </div>

                            </div>
                        )

                    })}

                </div>
            </div>
        </div>
    )


    
}

export default LocationDetails;