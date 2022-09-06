import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './PostDetails.css';

import { addPostThunk, getALocatuinThunk } from '../../store/location';
import { isValidUrl, cut } from "../../util";
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';

function PostDetails({ setModal, location, user }) {
    const dispatch = useDispatch()
    const history = useHistory();

    const [post, setPost] = useState('');

    const [preview_img, setPreview_img] = useState(location.preview_img);

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
      
        if (post.length === 0) newError.push('Please write a post');
        if (post.length > 2000) newError.push('Post should be less than 2000 characters');
        if (preview_img.length > 1000) newError.push('Preview image should be less than 1000 characters');
        
        if (!validURL) {
            newError.push(
                "Invalid URL: Please enter a valid URL ending in - jpg/jpeg/png/webp/avif/gif/svg. Also please make sure this image CORS policy compliant. Image can be blocked by CORS policy due to: No 'Access-Control-Allow-Origin' header being present on the requested resource."
            );
        }
        setError(newError);
    }, [post, preview_img, validURL]);

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
            const mewPost = {
                location_id: location.id,
                post, 
                preview_img,
                userIdd: user.id
            };
            setError([]);
            dispatch(addPostThunk(mewPost)).then((res) => {
                if (res.id) {
                    setModal(false);
                    dispatch(getALocatuinThunk(location.id));
                }
            }).catch(
                async (res) => {
                    console.log('res', res)
                    // const error = await res.json();
                    // setError(error.errors);
                }
            );
        }
    }

    return (
       
        <div className="e-location-details">
           

            <form className='e-form' onSubmit={handleSubmit}>
                <h1>
                    Write a Post for {location.name}
                </h1>
            
               


                <label>* Post:
                    <textarea type={'text'}
                        value={post}
                        onChange={e => setPost(e.target.value)}
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
                   
                    "details", (post.length === 0 || post.length > 2000),
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
                            post.length === 0 || post.length > 2000 ||
                            preview_img.length > 1000 || !validURL

                        }
                        className={`submit-btn ${
                            post.length === 0 || post.length > 2000 ||
                            preview_img.length > 1000 || !validURL
                            ? "disabled"
                            : "enabled"
                            }`}
                        id='e-submit-btn'
                    >
                        Post
                    </button>

                </div>
            </form>
        </div>
    )
}

export default PostDetails;