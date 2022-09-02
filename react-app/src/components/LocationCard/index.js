import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cut } from "./../../util";
import './LocationCard.css'


function LocationCard ({location, user}) {

    return(
        <Link to={`/locations/${location.id}`}>
            <div className="location-card flex">
                <div className="location-image-div">
                    <img src={location.preview_img} alt={location.name} className="location-image" />
                </div>

                <div className="location-info">
                    <div className="location-name">
                        {location.name}
                    </div>
                    <div className="location-address">
                        {location.address}
                    </div>
                    {location.details.length <= 150 && (
                        <div className="location-details">
                            {location.details}
                        </div>
                    )}
                    {location.details.length > 150 && (
                        <div className="location-details">
                            {cut(location.details)}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )

}

export default LocationCard;