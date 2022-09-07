// import './EditLocationModal.css';
import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import PostEdit from './EditPost';


function EditPostModal({ post }) {

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
                className="e-post-btn flex"
                onClick={() => setShowModal(true)}
            >
                <i class="fa-solid fa-ellipsis"></i>
            </button>
            {showModal && (
                <Modal
                    id="post-model"
                    onClose={() => setShowModal(false)}
                    className="post-model"
                >
                    <PostEdit
                        setModal={setModal}
                        postToBeEdited={post}
                        className="post-model"
                    />
                </Modal>
            )}
        </>
    );

}

export default EditPostModal;