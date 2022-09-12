import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Records = ({ locations }) => {

  
    return (
        <div className="all-loc-feed">
            <div className="all-location-container flex">
                {locations.map(location => (
                    <Link to={`/locations/${location.id}`}>
                        <div className="all-location-card flex">
                            {/* <div className="all-location-image-div">
                                <img 
                                src={location.preview_img} 
                                alt={location.name} 
                                className="all-location-image" 
                                onError={e => { e.currentTarget.src = "https://res.cloudinary.com/hansenguo/image/upload/v1661959406/Hikinglp/Logo_sytg4b.png"; }}
                                />
                            </div> */}

                            <div className="all-location-info">
                                <div className="all-location-name">
                                    {location.name}
                                </div>
                                <div className="all-location-address">
                                    {location.address}, {location.city}, {location.state}
                                </div>
                            </div>
                        </div>
                    </Link>

                ))}

            </div>
        </div>


    )
}

export default Records  