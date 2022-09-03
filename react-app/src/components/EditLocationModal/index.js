// import './EditLocationModal.css';
import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "../../context/Modal";
import LocationDetails from './LocationDetails';


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
                className="comments-botton"
                onClick={() => setShowModal(true)}
            >
                Edit Location
            </button>
            {showModal && (
                <Modal
                    id="post-model"
                    onClose={() => setShowModal(false)}
                    className="post-model"
                >
                    <LocationDetails
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