// import './EditLocationModal.css';
import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import PostDetails from './PostDetails';


function CreatePostModal({location, user}) {

    const [showModal, setShowModal] = useState(false);
    const setModal = (show) => setShowModal(show);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [showModal]);

    return (
        <>
            <button
                className="c-post-btn flex"
                onClick={() => setShowModal(true)}
            >
                <i class="fa-regular fa-star"></i>
                Write a Post
            </button>
            {showModal && (
                <Modal
                    id="post-model"
                    onClose={() => setShowModal(false)}
                    className="post-model"
                >
                    <PostDetails
                        setModal={setModal}
                        location={location}
                        user={user}
                        className="post-model"
                    />
                </Modal>
            )}
        </>
    );

}

export default CreatePostModal;