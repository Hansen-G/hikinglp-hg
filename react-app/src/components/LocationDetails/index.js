/* eslint-disable no-undef */
import './LocationDetails.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import { getALocatuinThunk, deleteLocationThunk } from '../../store/location';
import { pastDate } from "./../../util";
import EditLocationModal from '../EditLocationModal';
import LoginFormModal from '../LoginFormModal';
import ImageCard from "./ImageCard";
import GoogleMapReact from 'google-map-react';
import CreatePostModal from '../CreatePostModal';
import PostCard from "../PostCard";
import { isValidUrl } from "../../util";

// import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api"
// import { GoogleMap, Marker } from "react-google-maps"



require('dotenv').config();

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
    const [loaded, setLoaded] = useState(false);
    const location = useSelector((state) => state.locations[locationId]);
    const user = useSelector((state) => state.session.user);
    const [googleMapAPIKey, setGoogleMapAPIKey] = useState(null);

    const helper = async (locationId) => {
        const location = await dispatch(getALocatuinThunk(locationId));
    }
    useEffect(() => {
        helper(locationId);
    }, [locationId, dispatch]);



    const APIhelper = async (location) => {
        if (!location) {
            return;
        }
        else if (!location.nsf_id) {
            setLoaded(true)
            return
        }
        const NSF_API_KEY = await fetch('/nps_api_key')
        if (!NSF_API_KEY) {
            setLoaded(true)
            return
        }
        const REACT_APP_NPS_API_KEY = await NSF_API_KEY.json()
        console.log(REACT_APP_NPS_API_KEY)

        try {
            const response = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${location.nsf_id}&api_key=${REACT_APP_NPS_API_KEY}`);
            const data = await response.json();
            setLocationExtraData(data.data[0]);
            setLoaded(true)
        }
        catch (e) {
            console.log(e)
            setLocationExtraData(null)
        }

        try {
            const response = await fetch(`/google_map_api_key`);
            const data = await response.json();
            setGoogleMapAPIKey(data)
        } 
        catch (e) {
            console.log(e)
            setGoogleMapAPIKey(null)
        }
        const setDisplay = await setLoaded(true);
        window.scrollTo(0, 0)
    }
    useEffect(() => {
        APIhelper(location);
    }, [location]);

        
    if (!location || Object.keys(location).length === 0){
        return null
    }

    if (!loaded) {
        return (
            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662133140/Hikinglp/Screen_Recording_2022-09-01_at_17_55_12_MOV_AdobeExpress_y187t2.gif' alt='loading' className='loading' />
        )
    }

    // const renderMarkers = (map, maps, lat, lng) => {
    //     let marker = new maps.Marker({
    //         position: { lat: lat, lng: lng },
    //         map,
    //         title: 'Hello World!'
    //     });
    //     return marker;
    // };
    const postArr = location.posts.sort(function (a, b) {
        return new Date(b["createdAt"]) - new Date(a["createdAt"]);
    });



    function googleMap(lat, lng, googleMapAPIKey) {
        return (
            <div className='google-map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleMapAPIKey }}
                    defaultCenter={{lat: lat, lng: lng}}
                    defaultZoom={10}
                    yesIWantToUseGoogleMapApiInternals={true}
                    isMarkerShown={true}
                    
            
                >
                    {/* <Marker
                        lat={lat}
                        lng={lng}
                        text="My Marker"
                    /> */}
                </GoogleMapReact>
            </div>
        )
    }




    const handleDelete = async (e) => {
        e.preventDefault();
        if (window.confirm('Do you really want to delete this Location? This action can not be undone!')) {
            const response = await dispatch(deleteLocationThunk(locationId));
            if (response) {
                window.alert('Successfully deleted the Location, Click OK to bring you back to Location List')
                history.push('/locations/all');
            }
        }
      
    }


    return (
        <div className='loc-d'>
            <script>
                
            </script>
            <div className='loc-d-header'>
                <div>
                    {console.log('isValidUrl(location.preview_img)',isValidUrl(location.preview_img))}
                    {isValidUrl(location.preview_img) && (
                    <img 
                    onError={e => { e.currentTarget.src = "https://res.cloudinary.com/hansenguo/image/upload/v1662189939/Hikinglp/WX20220903-032532_2x_re1fri.png"; }}
                    src={location.preview_img} 
                    alt={location.name} 
                    className='loc-d-bg' />
                    )}
                    
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
            <div className='loc-d-func'>
            
                {user && location.user_id === user.id && (
                    <div>
                        <EditLocationModal location={location} user={user} />
                        <button
                            className="e-loc-btm flex"
                            onClick={handleDelete}
                        >
                            <i class="fa-regular fa-pen-to-square"></i>
                            Delete Location
                        </button>
                    </div>
                    

                )}

                {user && (
                    <div>
                        <CreatePostModal location={location} user={user} />
                    </div>


                )}


            </div>

           
            <div className={location_extra_data ? 'loc-d-main-yes flex' : 'loc-d-main-no flex'}>

                <div className='loc-d-main-l'>
                    <div className='loc-map Poppins main-div'>
                        <h2 className='loc-map-title title'>Location & Hours</h2>
                        <div className='loc-map-add loc-main'>{location.address}, {location.city}, {location.state}</div>
                        {googleMapAPIKey && googleMap(location.lat, location.lng, googleMapAPIKey) }
                       


                      
                       
                   


                

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
                                postArr.map((post) => {
                                    return (
                                        <PostCard key={post.id} post={post} />
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