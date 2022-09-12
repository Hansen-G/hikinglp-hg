import React from "react";
import { Link } from "react-router-dom";
import { cut } from "./../../util";
import './LocationCard.css'


function LocationCard ({location}) {

    return(
        <Link to={`/locations/${location.id}`}>
            <div className="location-card flex">
                <div className="location-image-div">
                    <img 
                    src={location.preview_img} 
                    alt={location.name} 
                    className="location-image" 
                    onError={e => { e.currentTarget.src = "https://res.cloudinary.com/hansenguo/image/upload/v1661959406/Hikinglp/Logo_sytg4b.png"; }}
                    />
                </div>

                <div className="location-info card">
                    <div className="location-name">
                        {location.name}
                    </div>
                    <div className="location-address">
                        {location.address}
                    </div>
                    {location.details.length <= 100 && (
                        <div className="location-details">
                            {location.details}
                        </div>
                    )}
                    {location.details.length > 100 && (
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