import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import { addLocationThunk } from '../../store/location';
import "./CreateLocation.css";
import { isValidUrl } from "../../util";

function CreateLocation(){
    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [details, setDetails] = useState('');
    const [preview_img, setPreview_img] = useState('');
    const [lat, setLat] = useState(0.0000);
    const [lng, setLng] = useState(0.0000);
    const [error, setError] = useState([]);

    const [validURL, setValidURL] = useState(false); // Boolean that will show if the URL below is actually a valid image url
    const setURLAndCheckURL = async (urlInput) => {
        const res = await isValidUrl(urlInput, setError, error);
        setValidURL(res);
        setPreview_img(urlInput);
    };

    useEffect(() => {
        if (preview_img) {
            setURLAndCheckURL(preview_img);
        }
    }, [preview_img]);

    useEffect(() => {
        setError([]);
    }, [validURL]);


    useEffect(() => {
        if (sessionUser === null) {
            history.push('/login');
        }
    } , [sessionUser, history]);
    useEffect(() => {
        const newError = [];
        if (name.length === 0) newError.push('Name is required');
        if (name.length > 100) newError.push('Name should be less than 100 characters');
        if (address.length === 0) newError.push('Address is required');
        if (address.length > 1000) newError.push('Address should be less than 1000 characters');
        if (details.length === 0) newError.push('Details is required');
        if (details.length > 2000) newError.push('Details should be less than 2000 characters');
        if (preview_img.length > 1000) newError.push('Preview image should be less than 1000 characters');
        if (lat < -90) newError.push('Latitude should be greater than -90');
        if (lat > 90) newError.push('Latitude should be less than 90');
        if (lng < -180) newError.push('Longitude should be greater than -180');
        if (lng > 180) newError.push('Longitude should be less than 180');
        if (!validURL) {
            newError.push(
                "Invalid URL: Please enter a valid URL ending in - jpg/jpeg/png/webp/avif/gif/svg. Also please make sure this image CORS policy compliant. Image can be blocked by CORS policy due to: No 'Access-Control-Allow-Origin' header being present on the requested resource."
            );
        }


        setError(newError);
    } , [name, address, details, preview_img, lat, lng]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitErrors = [];
        if (!validURL) {
            submitErrors.push(
                "Invalid URL: Please enter a valid URL ending in - jpg/jpeg/png/webp/avif/gif/svg. Also please make sure this image CORS policy compliant. Image can be blocked by CORS policy due to: No 'Access-Control-Allow-Origin' header being present on the requested resource."
            );
        }

        if (submitErrors.length > 0) {
            return setError(submitErrors);
        } else {
            setError(submitErrors);
        }

        if (error.length === 0) {
            const newLocation = {
                name,
                address,
                details,
                preview_img,
                lat,
                lng,
                userId: sessionUser.id
            };
            setError([]);
            dispatch(addLocationThunk(newLocation)).then((res) => {
                history.push('/locations/' + res.id);
            }).catch(
                async (res) => {
                    const error = await res.json();
                    setError(error.errors);
                }
            );
        }
    }
    




    return(
        <div className='create-loc flex'>
            <div className='creare-loc-l'>

                <form onSubmit={handleSubmit}>
                    <h1>
                        Create New Location
                    </h1>

                    <h2>
                        Hello! Let’s start with your location name
                    </h2>
                    <p>We’ll use this information to help you claim your Hikinglp page.</p>

                    <label>* Name:
                        <input type={'text'} 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                         maxLength={100}
                        required>
                        </input>
                    </label>

                    {name.length > 0 && (<h2>
                        Next, tell us where {name} is located
                    </h2>)}

                    {name.length === 0 && (<h2>
                        Next, tell us where the location is located
                    </h2>)}


                    <p>We’ll use this information to help others find your suggested hiking location.</p>

                    <label>* Address:
                        <input type={'text'}
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            maxLength={1000}
                            required>
                        </input>
                    </label>

                    <label>* Latitude:
                        <input type={'number'}
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                            min={-90}
                            max={90}
                            step={0.000001}
                            required>
                        </input>
                    </label>

                    <label>* Longitude:
                        <input type={'number'}
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                            min={-180}
                            max={180}
                            step={0.000001}
                            required>
                        </input>
                    </label>


                    <h2>
                        Then, tell us something about the location
                    </h2>
                    <p>Please provide some details and suggestion for hiking at this location</p>

                    <label>* Details:
                        <textarea type={'text'}
                            value={details}
                            onChange={e => setDetails(e.target.value)}
                            maxLength={2000}
                            required>
                        </textarea>
                    </label>

                    <h2>
                        Last, upload a preview image of the location
                    </h2>
                    <p></p>

                    <label>* Preview image:
                        <input type={'text'}
                            value={preview_img}
                            onChange={e => setPreview_img(e.target.value)}
                            maxLength={1000}
                            required>
                        </input>
                    </label>




                    {console.log(
                        "name", (name.length === 0 || name.length > 100),
                        "address", (address.length > 1000 || address.length === 0),
                        "lat", (lat < -90 || lat > 90),
                        "lng", (lng < -180 || lng > 180),
                        "details", (details.length === 0 || details.length > 2000),
                        "URL", (preview_img.length > 1000 || !validURL))}

                    {error.length > 0 && (
                        <div className='error'>
                            {error.map((err, i) => (
                                <p key={i}>{err}</p>
                            ))}
                        </div>
                    )}

                    <button type="submit"
                        disabled={
                            name.length === 0 || name.length > 100 ||
                            address.length > 1000 || address.length === 0 || 
                            lat < -90 || lat > 90 ||
                            lng < -180 || lng > 180 ||
                            details.length === 0 || details.length > 2000 ||
                            preview_img.length > 1000 || !validURL

                        }
                        className={`submit-btn ${
                            name.length === 0 || name.length > 100 ||
                            address.length > 1000 || address.length === 0 ||
                            lat < -90 || lat > 90 ||
                            lng < -180 || lng > 180 ||
                            details.length === 0 || details.length > 2000 ||
                            preview_img.length > 1000 || !validURL
                                ? "disabled"
                                : "enabled"
                            }`}
                    >
                        Create Location
                    </button>





                </form>

            </div>

            <div className='create-loc-r'>
                <image src='https://s3-media0.fl.yelpcdn.com/assets/public/cityscape_300x233_v2.yji-deccc3d10e15b4494be1.svg'></image>
                <image src='https://s3-media0.fl.yelpcdn.com/assets/public/searching_on_map_234x177_v2.yji-0b5da3ce1e6a636298be.svg'></image>
            
                <div className='loc-d-header'>
                    <div>
                        <img src={preview_img} className='' />
                    </div>
                    <div className='loc-d-info'>
                        <h1>{name}</h1>
                        <div>{address} </div>
                        <div>Latitude: {lat}, Longitude: {lng}</div>


                    </div>

                </div>
            </div>

        </div>
    )
}

export default CreateLocation;