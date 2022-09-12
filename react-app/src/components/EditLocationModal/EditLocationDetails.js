import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './EditLocationModal.css';

import { editLocationThunk } from '../../store/location';
import { cut } from "../../util";
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

    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
   

    useEffect(() => {
        if (user === null) {
            history.push('/login');
        }
    }, [user, history]);

    useEffect(() => {
        const newError = [];
        if (name.trim().length === 0) newError.push('Name is required');
        if (name.length > 100) newError.push('Name should be less than 100 characters');
        if (address.trim().length === 0) newError.push('Address is required');
        if (address.length > 1000) newError.push('Address should be less than 1000 characters');
        if (details.trim().length === 0) newError.push('Details is required');
        if (details.length > 2000) newError.push('Details should be less than 2000 characters');
        if (directionsInfo.trim().length === 0) newError.push('Direction Infomation is required');
        if (directionsInfo.length > 2000) newError.push('Direction Infomation should be less than 2000 characters');
        if (preview_img.length > 1000) newError.push('Preview image should be less than 1000 characters');
        if (city.length > 100) newError.push("City must be less than 100 characters");
        if (city.length === 0) newError.push("City is required");
        if (state.length > 1000) newError.push("State must be less than 1000 characters");
        if (state.length === 0) newError.push("State is required");
        if (lat < -90) newError.push('Latitude should be greater than -90');
        if (lat > 90) newError.push('Latitude should be less than 90');
        if (lng < -180) newError.push('Longitude should be greater than -180');
        if (lng > 180) newError.push('Longitude should be less than 180');
        if (typeof lat === 'string') {
            if (lat.split('.')[1]) {
                if (lat.split('.')[1].length > 6) newError.push('Latitude should have less than 6 decimal places');
            }
        }
        if (typeof lng === 'string') {
            if (lng.split('.')[1]) {
                if (lng.split('.')[1].length > 6) newError.push('Longitude should have less than 6 decimal places');
            }
        }
        setError(newError);
    }, [name, address, details, preview_img, lat, lng, city, state, directionsInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitErrors = [];

       if (!name) submitErrors.push('Name is required');
        
       
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
                if (res.errors) {
                    setError(res.errors);
                }
                else {
                    setModal(false);
                }
            });
        }
    }


    const handleSubmitImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        const res = await fetch('/api/locations/upload', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const response = await res.json();
            setPreview_img(response.url);

            setImageLoading(false);
            // history.push("/images");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            alert("An error occurred while uploading the image.");

        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }








    return (
       
        <div className="e-location-details">
           

            <form className='e-form' onSubmit={handleSubmit}>
                <h1>
                    Edit Location
                </h1>

                <div className='instructions'>
                    The items marked with an asterisk (*) are required.
                </div>
            
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
                        maxLength={100}
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

                <label>Preview Image:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                        className='file-input'
                        id='file-input'
                    />
                    <button
                        onClick={handleSubmitImage}
                        className={`file-input-button ${image ? 'active' : ''}`}
                        disabled={image === null}
                    >Submit</button>
                    <button
                        onClick={() => {
                            setImage(null)
                            document.getElementById('file-input').value = null;
                        }}
                        className={`file-input-button ${image ? 'active' : ''}`}
                        disabled={image === null}
                    >Delete</button>

                    {(imageLoading) && <p>Loading...</p>}
                </label>

                

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
                            preview_img.length > 1000 || error.length > 0

                        }
                        className={`submit-btn ${name.length === 0 || name.length > 100 ||
                            address.length > 1000 || address.length === 0 ||
                            city.length > 100 || city.length === 0 ||
                            state.length > 100 || state.length === 0 ||
                            lat < -90 || lat > 90 ||
                            lng < -180 || lng > 180 ||
                            details.length === 0 || details.length > 2000 ||
                            directionsInfo.length === 0 || directionsInfo.length > 2000 ||
                            preview_img.length > 1000 
                            || error.length > 0
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