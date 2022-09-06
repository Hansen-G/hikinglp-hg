import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './EditLocationModal.css';

import { editLocationThunk } from '../../store/location';
import { isValidUrl, cut } from "../../util";
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';

function EditLocationDetails({ setModal, location, user }) {
    const dispatch = useDispatch()
    const history = useHistory();
    const [name, setName] = useState(location.name);
    const [address, setAddress] = useState(location.address);
    const [details, setDetails] = useState(location.details);
    const [directionsInfo, setDirectionsInfo] = useState(location.directionsInfo);
    const [city, setCity] = useState(location.city);
    const [state, setState] = useState(location.state);
    const [preview_img, setPreview_img] = useState(location.preview_img);
    const [lat, setLat] = useState(location.lat);
    const [lng, setLng] = useState(location.lng);
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
        if (user === null) {
            history.push('/login');
        }
    }, [user, history]);

    useEffect(() => {
        const newError = [];
        if (name.length === 0) newError.push('Name is required');
        if (name.length > 100) newError.push('Name should be less than 100 characters');
        if (address.length === 0) newError.push('Address is required');
        if (address.length > 1000) newError.push('Address should be less than 1000 characters');
        if (details.length === 0) newError.push('Details is required');
        if (details.length > 2000) newError.push('Details should be less than 2000 characters');
        if (directionsInfo.length === 0) newError.push('Direction Infomation is required');
        if (directionsInfo.length > 2000) newError.push('Direction Infomation should be less than 2000 characters');
        if (preview_img.length > 1000) newError.push('Preview image should be less than 1000 characters');
        if (city.length > 1000) newError.push("City must be less than 1000 characters");
        if (city.length === 0) newError.push("City is required");
        if (state.length > 1000) newError.push("State must be less than 1000 characters");
        if (state.length === 0) newError.push("State is required");
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
    }, [name, address, details, preview_img, lat, lng, city, state, directionsInfo, validURL]);

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
                id: location.id,
                name,
                address,
                city,
                state,
                details,
                preview_img,
                lat,
                lng,
                directionsInfo,
                userId: user.id
            };
            setError([]);
            dispatch(editLocationThunk(newLocation)).then((res) => {
                if (res.ok) {
                    setModal(false);
                }
            }).catch(
                async (res) => {
                    const error = await res.json();
                    setError(error.errors);
                }
            );
        }
    }








    return (
       
        <div className="e-location-details">
           

            <form className='e-form' onSubmit={handleSubmit}>
                <h1>
                    Edit Location
                </h1>
            
                <label>* Name:
                    <input type={'text'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        maxLength={100}
                        required>
                    </input>
                </label>

                <label>* Address:
                    <input type={'text'}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        maxLength={1000}
                        required>
                    </input>
                </label>

                <label>* City:
                    <input type={'text'}
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required>
                    </input>
                </label>

                <label>* State:
                    <select onChange={e => setState(e.target.value)} value={state} required>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
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

                <label>* Direction Information:
                    <textarea type={'text'}
                        value={directionsInfo}
                        onChange={e => setDirectionsInfo(e.target.value)}
                        maxLength={2000}
                    
                        required>
                    </textarea>
                </label>

                <label>* Details:
                    <textarea type={'text'}
                        value={details}
                        onChange={e => setDetails(e.target.value)}
                        maxLength={2000}
                        
                        required>
                    </textarea>
                </label>

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
                    <div className='error-title'>
                        Please correct the following errors before submit:
                    </div>
                )}

                {error.length > 0 && (
                    <ol className='error'>
                        {error.map((err, i) => (
                            <li key={i} className='error-item'>{err}</li>
                        ))}
                    </ol>
                )}



                <div className="e-buttem-div flex">

                    <button type="button" onClick={() => setModal(false)} className='cancel-btn'>
                        Cancale
                    </button>
                    
                    <button type="submit"
                        disabled={
                            name.length === 0 || name.length > 100 ||
                            address.length > 1000 || address.length === 0 ||
                            city.length > 100 || city.length === 0 ||
                            state.length > 100 || state.length === 0 ||
                            lat < -90 || lat > 90 ||
                            lng < -180 || lng > 180 ||
                            details.length === 0 || details.length > 2000 ||
                            directionsInfo.length === 0 || directionsInfo.length > 2000 ||
                            preview_img.length > 1000 || !validURL

                        }
                        className={`submit-btn ${name.length === 0 || name.length > 100 ||
                            address.length > 1000 || address.length === 0 ||
                            city.length > 100 || city.length === 0 ||
                            state.length > 100 || state.length === 0 ||
                            lat < -90 || lat > 90 ||
                            lng < -180 || lng > 180 ||
                            details.length === 0 || details.length > 2000 ||
                            directionsInfo.length === 0 || directionsInfo.length > 2000 ||
                            preview_img.length > 1000 || !validURL
                            ? "disabled"
                            : "enabled"
                            }`}
                        id='e-submit-btn'
                    >
                        Edit Location
                    </button>

                </div>

               




            </form>


        </div>
    )
}

export default EditLocationDetails;