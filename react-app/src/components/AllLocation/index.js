
import React, { useEffect, useState, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocationThunk } from "../../store/location";


import './AllLocation.css'
import Records from './records'
import Pagination from './Pagination'
import AI from '../AI'
import ButtomBar from '../ButtomBar'

//!!! Pagination inspired by https://levelup.gitconnected.com/a-simple-guide-to-pagination-in-react-facd6f785bd0


function AllLocation() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const locations = useSelector((state) => state.locations);
    const [loaded, setLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(48);


    useEffect(() => {
        dispatch(getAllLocationThunk());
        window.scrollTo(0, 0)
    }, [dispatch, user]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoaded(true);
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    if (!loaded) {
        return (
            <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662133140/Hikinglp/Screen_Recording_2022-09-01_at_17_55_12_MOV_AdobeExpress_y187t2.gif' alt='loading' className='loading' />
        )
    }

    let locationsArr = Object.values(locations)

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentPages = locationsArr.slice(firstItemIndex, lastItemIndex);
    const totalPage = Math.ceil(locationsArr.length / itemsPerPage)


    return (
        <div className='container mt-5'>
            <h2 className="all-loc-title"> All Locations </h2>
            <Records locations={currentPages} />
            <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ButtomBar />
        </div>

    )
}

export default AllLocation;