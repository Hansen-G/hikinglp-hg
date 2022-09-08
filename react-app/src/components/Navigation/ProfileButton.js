import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css'


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout()).then(
            () => {
                history.push(`/`)
            }
        );
    };

    console.log(user, user.lastName)
    return (
        <>
            <div className="profileButtonDiv">
                <button className="profileButton" onClick={openMenu}>
                    <img src={user.profile_img} className='nav-user-img' />
                </button>
            </div>

            {showMenu && (
                <div className="menuDiv">
                    <div className="dropdownBox">
                        {/* <div className="usernameDiv">
                    Welcome {user.lastName}!
                </div> */}
                        <div className="usernameDiv">
                            Name: {user.name}
                        </div>
                        <div className="emailDiv">
                            Email: {user.email}
                        </div>
                        <div className="linkDiv" >
                            <Link to='/' id="menuLink">Find a Location</Link>
                        </div>
                        <div className="linkDiv" id='linkDiv'>
                            <Link to='/locations/new' id="menuLink">Create a Location</Link>
                        </div>

                        <div className="logoutDiv" onClick={logout}>Log Out</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileButton;