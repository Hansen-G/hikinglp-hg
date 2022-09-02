import './LocationDetails.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import { getALocatuinThunk, editLocationThunk } from '../../store/location';

function LocationDetails () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { locationId } = useParams();

    console.log('loactionId', locationId);

    const location = useSelector((state) => state.locations);
    const user = useSelector((state) => state.session.user);


    const helper = async (locationId) => {
        const location = await dispatch(getALocatuinThunk(locationId));
    }

    useEffect(() => {
        helper(locationId);
    }, [locationId]);

    console.log('!!!!!!!!!!!!', location);


    if (!location || Object.keys(location).length === 0){
        return null
    }
    return null


    
}

export default LocationDetails;