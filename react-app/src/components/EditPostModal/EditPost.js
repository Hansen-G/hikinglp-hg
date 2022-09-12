import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditPostModal.css';
import { getAllLocationThunk, editPostThunk, deletePostThunk } from '../../store/location';
import { getAllPostThunk } from '../../store/posts'
import { useHistory } from 'react-router-dom';

function PostEdit({ setModal, postToBeEdited }) {
    const dispatch = useDispatch()
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const [post, setPost] = useState(postToBeEdited.post);
    const [preview_img, setPreview_img] = useState(postToBeEdited.preview_img);
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
      
        if (post.trim().length === 0) newError.push('Please write a post');
        if (post.length > 2000) newError.push('Post should be less than 2000 characters');
        if (preview_img.length > 1000) newError.push('Preview image should be less than 1000 characters');
        if (preview_img.trim().length === 0) newError.push('Please enter a preview image');
        setError(newError);
    }, [post, preview_img]);

    const handleSubmitEdit = (e) => {
        e.preventDefault();

        const submitErrors = [];
        if (!post) submitErrors.push('Please write a post');

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
                if (res.errors) {
                    setError(res.errors);

                }
                else if (res.id) {
                    setModal(false);
                    dispatch(getAllLocationThunk());
                    dispatch(getAllPostThunk());
                }
                else {
                    setError(['Something went wrong. Please try again.']);
                }
            });
            
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();

        dispatch(deletePostThunk(postToBeEdited.location_id, postToBeEdited.id)).then((res) => {
            if (res.errors) {
                setError(res.errors);
            }
            else if (res.id) {
                setModal(false);
                dispatch(getAllLocationThunk());
                dispatch(getAllPostThunk());
            }
            else {
                setError(['Something went wrong. Please try again.']);
            }
        });
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
           

            {/* <form className='e-form' onSubmit={handleSubmitEdit}> */}
                <h1>
                    Edit or delete this post
                </h1>

                <div className='instructions'>
                    The items marked with an asterisk (*) are required.
                </div>

                <label>* Post:
                    <textarea type={'text'}
                        value={post}
                        onChange={e => setPost(e.target.value)}
                        maxLength={2000}
                        required>
                    </textarea>
                </label>


            <label> Post Image:
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
                            preview_img.length > 1000 || preview_img.length === 0
                            || error.length > 0

                        }
                        className={`submit-btn ${
                            post.length === 0 || post.length > 2000 ||
                            preview_img.length > 1000 || preview_img.length === 0
                            || error.length > 0
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