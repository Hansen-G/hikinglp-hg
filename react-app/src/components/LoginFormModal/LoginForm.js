import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { NavLink, useParams, Route, Switch, Link, useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginForm( {setModal}) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    
  

    return (
        <div className='loginForm flex'>
                <img src="https://res.cloudinary.com/hansenguo/image/upload/v1658770529/WeMeet/logo-round_yxfzs4.png" className="roundLogo"></img>
                <h1 className="title">
                    Log in
                </h1>
        </div>
        
    );
}

export default LoginForm;