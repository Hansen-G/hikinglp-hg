// import './EditLocationModal.css';
import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import EditLocationDetails from './EditLocationDetails';


function EditLocationModal({location, user}) {

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
                className="e-loc-btm flex"
                onClick={() => setShowModal(true)}
            >
                <i class="fa-regular fa-pen-to-square"></i>
                Edit Location
            </button>
            {showModal && (
                <Modal
                    id="post-model"
                    onClose={() => setShowModal(false)}
                    className="post-model"
                >
                    <EditLocationDetails
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

export default EditLocationModal;