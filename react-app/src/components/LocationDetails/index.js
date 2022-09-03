import './LocationDetails.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import { getALocatuinThunk, editLocationThunk } from '../../store/location';
import { pastDate } from "./../../util";
import EditLocationModal from '../EditLocationModal';
import LoginFormModal from '../LoginFormModal';
import ImageCard from "./ImageCard";

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
    const [location_extra_data, setLocationExtraData] = useState(null);

    const location = useSelector((state) => state.locations[locationId]);
    const user = useSelector((state) => state.session.user);


    useEffect(() => {
        if (!location) {
            return;
        }
        else if (!location.nsf_id){
            return
        }
        (async () => {
            const response = await fetch(`https://developer.nps.gov/api/v1/parks?id=${location.nsf_id}&api_key=${process.env.REACT_APP_NPS_API_KEY}&limit=1`, {
                headers: {
                    "Authorization": process.env.REACT_APP_NPS_API_KEY,
                },
            });
            if (response.ok) {
                let data = await response.json();
                let usedData = data.data[0]
                let location_extra_data = {
                    url: usedData.url,
                    activities: usedData.activities,
                    topics: usedData.topics,
                    contacts: usedData.contacts,
                    entranceFees: usedData.entranceFees,
                    operatingHours: usedData.operatingHours,
                    images: usedData.images,
                    weatherInfo: usedData.weatherInfo,

                }
                setLocationExtraData(location_extra_data)

            }
          
            
        })();
        window.scrollTo(0, 0)
    }, [location]);

    


    const helper = async (locationId) => {
        const location = await dispatch(getALocatuinThunk(locationId));
    }

    useEffect(() => {
        helper(locationId);
    }, [locationId, dispatch]);




    if (!location || Object.keys(location).length === 0){
        return null
    }
    

    console.log("location_extra_data", location_extra_data)


    return (
        <div className='loc-d'>
            <div className='loc-d-header'>
                <div>
                    <img src={location.preview_img} alt={location.name} className='loc-d-bg'/>
                </div>
                <div className='loc-d-info'>
                    <h1>{location.name}</h1>

                    <p>{postNumber(location.posts)} posts</p>
                    <i class="fa-solid fa-signs-post"></i>
                    <p>{location.address}, {location.city}, {location.state}</p>
                    <div>Latitude: {location.lat}, Longitude: {location.lng}</div> 
                    
                
                </div>

            </div>

            <div className='loc-d-img-div flex'>
                {location_extra_data && location_extra_data.images && location_extra_data.images.map((image) => {
                    return (
                        <ImageCard key={image.id} image={image} />
                    )
                })}
            </div>

           
            <div className={location_extra_data ? 'loc-d-main-yes flex' : 'loc-d-main-no flex'}>
                {/* {user && location.user_id === user.id && (
                    <div className='loc-d-func'>
                        <h1>Edit Location</h1>
                        <LoginFormModal location={location} user={user} />

                    </div>
                )} */}
                <div className='loc-d-main-l'>
                    <div className='loc-map Poppins main-div'>
                        <h2 className='loc-map-title title'>Location & Hours</h2>
                        <div className='loc-map-add loc-main'>{location.address}, {location.city}, {location.state}</div>

                    </div>

                    <div className='loc-directionsInfo Poppins main-div'>
                        <h2 className='loc-directionsInfo-title title'>Direction Infomation</h2>
                        <div className='loc-main'>{location.directionsInfo}</div>

                    </div>

                    <div className='loc-about Poppins main-div'>
                        <h2 className='loc-about-title title'>About the Location</h2>
                        <div className='loc-main'>{location.details}</div>
                    </div>

                    {location_extra_data && location_extra_data.weatherInfo && (
                        <div className='loc-about Poppins main-div'>
                            <h2 className='loc-about-title title'>Weather</h2>
                            <div className='loc-main'>{location_extra_data.weatherInfo}</div>
                        </div>
                    )}

                    {location_extra_data && location_extra_data.activities && (
                        <div className='loc-about Poppins main-div'>
                            <h2 className='loc-about-title title'>Activities</h2>
                            <div className='loc-main'>
                                <ul>
                                    {location_extra_data.activities.map((activity) => (
                                        <li>{activity.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {location_extra_data && location_extra_data.topics && (
                        <div className='loc-about Poppins main-div'>
                            <h2 className='loc-about-title title'>Topics</h2>
                            <div className='loc-main'>
                                <ul>
                                    {location_extra_data.topics.map((topic) => (
                                        <li>{topic.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}


                </div>

                <div className='loc-d-main-r'>
                    <div className='loc-about Poppins main-div'>
                        <h2 className='loc-about-title title'>Recommended Postes</h2>
                        {!location.posts || location.posts.length === 0 ?
                            (<div className='loc-main'>No posts yet</div>)
                            :
                            (

                                location.posts.map((post) => {
                                    return (
                                        <div key={post.id} className='loc-post-card'>
                                            <div className='loc-post-card-user flex'>
                                                <div className='user-img-div'>
                                                    <img src={post.user.profile_img} alt={post.user.name} className='user-img' />
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
                                                <img src={post.preview_img} alt={post.post} className='post-img' />
                                            </div>

                                        </div>
                                    )

                                })


                            )}
                    </div>
                </div>
                

            </div>
        </div>
    )


    
}

export default LocationDetails;