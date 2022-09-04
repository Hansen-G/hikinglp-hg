import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Records = ({ locations }) => {

    // return (
    //     <table className="table">
    //         <thead>
    //             <tr>
    //                 <th scope='col'>ID</th>
    //                 <th scope='col'>Name</th>
    //                 <th scope='col'>City</th>
    //                 <th scope='col'>State</th>

    //             </tr>
    //         </thead>
    //         <tbody>
    //             {data.map(item => (
    //                 <tr>
    //                     <td>{item.id} </td>
    //                     <td>{item.name} </td>
    //                     <td>{item.city} </td>
    //                     <td>{item.state} </td>
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </table>
    // )
    
    return (
        <div className="all-loc-feed">
            <div className="all-location-container flex">
                {locations.map(location => (
                    <Link to={`/locations/${location.id}`}>
                        <div className="all-location-card flex">
                            <div className="all-location-image-div">
                                <img src={location.preview_img} alt={location.name} className="all-location-image" />
                            </div>

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