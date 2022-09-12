import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addLocationThunk } from '../../store/location';
import "./CreateLocation.css";
import { cut } from "../../util";
import AI from '../AI'
import ButtomBar from '../ButtomBar'


function CreateLocation(){
    const dispatch = useDispatch()
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [details, setDetails] = useState('');
    const [directionsInfo, setDirectionsInfo] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('AL');
    const [preview_img, setPreview_img] = useState('');
    const [lat, setLat] = useState(0.000001);
    const [lng, setLng] = useState(0.000001);
    const [error, setError] = useState([]);
  
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    useEffect(() => {
        if (sessionUser === null) {
            history.push('/login');
        }
    } , [sessionUser, history]);
    
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
        if (preview_img.length > 1000) newError.push('Please try a different image');
        if (city.length > 100) newError.push("City must be less than 100 characters");
        if (city.length === 0) newError.push("City is required");
        if (state.length > 1000) newError.push("State must be less than 1000 characters");
        if (state.length === 0) newError.push("State is required");
        if (lat < -90) newError.push('Latitude should be greater than -90');
        if (lat > 90) newError.push('Latitude should be less than 90');
        if (lng < -180) newError.push('Longitude should be greater than -180');
        if (lng > 180) newError.push('Longitude should be less than 180');
        if (typeof lat === 'string'){
           if (lat.split('.')[1]){
                if (lat.split('.')[1].length > 6) newError.push('Latitude should have less than 6 decimal places');
           }
        }
        if (typeof lng === 'string'){
            if (lng.split('.')[1]){
                if (lng.split('.')[1].length > 6) newError.push('Longitude should have less than 6 decimal places');
            }
        }
        setError(newError);
    } , [name, address, details, preview_img, lat, lng]);

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        if (error.length === 0) {
            const newLocation = {
                name,
                address,
                city,
                state,
                details,
                preview_img,
                lat,
                lng,
                directionsInfo,
                userId: sessionUser.id
            };
            setError([]);
            dispatch(addLocationThunk(newLocation)).then((res) => {
                if (res.errors) {
                    setError(res.errors);
                }
                else if (res.id) {
                    history.push('/locations/' + res.id);
                }
                else {
                   setError(['Something went wrong. Please try again.']);
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
    





    return(
        <div className='create-loc flex'>
            <div className='creare-loc-l'>

                <form onSubmit={handleSubmit}>
                    <h1>
                        Create New Location
                    </h1>

                    <div className='instructions'>
                        The items marked with an asterisk (*) are required.
                    </div>

                    <h2>
                        Hello! Let’s start with your location name
                    </h2>
                    <p>We’ll use this information to help you claim your Hikinglp page.</p>

                    <label>* Name:
                        <input type={'text'} 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                         maxLength={99}
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
                            maxLength={1999}
                            required>
                        </input>
                    </label>

                    <label>* City:
                        <input type={'text'} 
                            value={city} 
                            onChange={e => setCity(e.target.value)} 
                            maxLength={99}
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


                    <h2>
                        Then, tell us something about the location
                    </h2>
                    <p>Please provide some details and suggestion for hiking at this location</p>
                    <label>* Direction Information:
                        <textarea type={'text'}
                            value={directionsInfo}
                            onChange={e => setDirectionsInfo(e.target.value)}
                            maxLength={1999}
                            required>
                        </textarea>
                    </label>

                    <label>* Details:
                        <textarea type={'text'}
                            value={details}
                            onChange={e => setDetails(e.target.value)}
                            maxLength={1999}
                            required>
                        </textarea>
                    </label>

                    <h2>
                        Last, upload a preview image of the location
                    </h2>
                    <p></p>

                   


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
                            onClick={ () => {
                                setImage(null)
                                setPreview_img('')
                                document.getElementById('file-input').value = null;
                            }}
                            className={`file-input-button ${image ? 'active' : ''}`}
                            disabled={image === null}
                        >Delete</button>

                        {(imageLoading) && <p>Loading...</p>}
                    </label>




                  
                    
                    {error.length > 0 && (
                        <div className='error-title'>
                            Please correct the following errors before creating your hiking location:
                        </div>
                    )}
                
                    {error.length > 0 && (
                        <ol className='error'>
                            {error.map((err, i) => (
                                <li key={i} className='error-item'>{err}</li>
                            ))}
                        </ol>
                    )}

                    <div className='submit-area'>
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
                                    preview_img.length > 1000 || error.length > 0
                                    ? "disabled"
                                    : "enabled"
                                }`}
                        >
                            Create Location
                        </button>

                    </div>

           





                </form>
               

            </div>

            <div className='create-loc-r'>
                <div className='create-loc-r-img-idv' id='loc-c-img-1'>
                    <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662151076/Hikinglp/cityscape_300x233_v2.yji-deccc3d10e15b4494be1_1_godhy1.png' className='loc-c-r-img-1'/>
                   

                </div>
               
            
                <div className='loc-c-header flex'>
                    <div>
                        {preview_img && (<img src={preview_img} className='loc-c-header-img' onError={e => { e.currentTarget.src = "https://res.cloudinary.com/hansenguo/image/upload/v1661959406/Hikinglp/Logo_sytg4b.png"; }} />)}
                        {!preview_img && (<img src="https://res.cloudinary.com/hansenguo/image/upload/v1661959406/Hikinglp/Logo_sytg4b.png" className='loc-c-header-img' />)}
                    </div>
                    <div className='loc-c-info'>
                        {!name && (<div className='loc-c-info-name'>Your Location Name</div>)}
                        {name && (<div className='loc-c-info-name'>{cut(name)}</div>)}
                        {!address && (<div className='loc-c-info-add'>Your Location Address</div>)}
                        {address && (<div className='loc-c-info-add'>{cut(address)}</div>)}
                        {!city && (<div className='loc-c-info-add'>Your Location City</div>)}
                        {city && (<div className='loc-c-info-add'>City: {cut(city)}</div>)}
                        {!state && (<div className='loc-c-info-add'>Your Location State</div>)}
                        {state && (<div className='loc-c-info-add'>State: {cut(state)}</div>)}
                        <div className='loc-c-info-l'>Latitude: {lat}, Longitude: {lng}</div>
                    </div>

 

                </div>
                <div className='create-loc-r-img-idv' id='loc-c-img-2'>
                    <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662151079/Hikinglp/searching_on_map_234x177_v2.yji-0b5da3ce1e6a636298be_rev2cr_1_hguxpf.png' className='loc-c-r-img-2' />


                </div>
                
            </div>

        </div>
    )
}

export default CreateLocation;