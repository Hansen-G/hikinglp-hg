import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditPostModal.css';

import { getAllLocationThunk, editPostThunk, deletePostThunk } from '../../store/location';
import { getAllPostThunk } from '../../store/posts'
import { isValidUrl, cut } from "../../util";
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';

function PostEdit({ setModal, postToBeEdited }) {
    const dispatch = useDispatch()
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const [post, setPost] = useState(postToBeEdited.post);
    const [preview_img, setPreview_img] = useState(postToBeEdited.preview_img);
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

    const handleSubmitEdit = (e) => {
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
            const newPost = {
                id: postToBeEdited.id,
                location_id: postToBeEdited.location_id,
                post, 
                preview_img,
                userId: user.id
            };

            setError([]);
            dispatch(editPostThunk(newPost)).then((res) => {
                console.log('RES', res);
                if (res.id) {
                    setModal(false);
                    dispatch(getAllLocationThunk());
                    dispatch(getAllPostThunk());
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

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deletePostThunk(postToBeEdited.location_id, postToBeEdited.id)).then((res) => {
            console.log('RES', res);
            if (res.id) {
                setModal(false);
                dispatch(getAllLocationThunk());
                dispatch(getAllPostThunk());
            }
        }).catch(
            async (res) => {
                console.log('res', res)
                // const error = await res.json();
                // setError(error.errors);
            }
        );
    }

    return (
       
        <div className="e-location-details">
           

            {/* <form className='e-form' onSubmit={handleSubmitEdit}> */}
                <h1>
                    Edit or delete this post
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


                {error &&error.length > 0 && (
                    <div className='error-title'>
                        Please correct the following errors before submit:
                    </div>
                )}

                {error && error.length > 0 && (
                    <ol className='error'>
                        {error.map((err, i) => (
                            <li key={i} className='error-item'>{err}</li>
                        ))}
                    </ol>
                )}

                <div className="e-buttem-div flex">

                    <button type="button" onClick={() => setModal(false)} className='cancel-btn'>
                        Cancel
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
                        onClick={handleSubmitEdit}
                    >
                        Save Edit
                    </button>
                <button type="button" onClick={handleDelete} className='submit-btn' id="delete-btn">
                        Delete
                    </button>
                </div>
            {/* </form> */}
        </div>
    )
}

export default PostEdit;