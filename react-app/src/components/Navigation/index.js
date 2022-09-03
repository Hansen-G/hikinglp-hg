import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton';

import './Navigation.css';



function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    
    return (
       <div className='nav flex'>
            <div className='nav-left'>
                <NavLink to='/' exact={true}>
                    <div className='nav-logo-div flex'>
                        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1661959406/Hikinglp/Logo_sytg4b.png' className='nav-logo' />
                        <div>Hikinglp</div>
                    </div>
                    
                </NavLink>
            </div>
            {sessionUser && (<div className='nav-right flex'>
                <NavLink to='/locations/new' exact={true} >
                    <div className='nav-button'>Create a Location</div>
                </NavLink>
                <NavLink to='/locations/new' exact={true} >
                    <div className='nav-button'>Write a Post</div>
                </NavLink>
               
                <div className='nav-button flex'>
                    <ProfileButton user={sessionUser} />
                    
                </div>
               
            </div>)}
            {!sessionUser && (<div className='nav-right flex'>
                <NavLink to='/login' exact={true} >
                    <div className='nav-button'>Login</div>
                </NavLink>
                <NavLink to='/sign-up' exact={true} >
                    <div className='nav-button'>Sign Up</div>
                </NavLink>
            </div>)}

       </div>
    );
}

export default Navigation;