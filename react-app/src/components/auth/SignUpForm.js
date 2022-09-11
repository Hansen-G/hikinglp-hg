import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { isValidUrl, cut } from "../../util";
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [preview_image, setPreview_image] = useState('');
  const user = useSelector(state => state.session.user);
  const [validURL, setValidURL] = useState(false); // Boolean that will show if the URL below is actually a valid image url
  const setURLAndCheckURL = async (urlInput) => {
    const res = await isValidUrl(urlInput, setErrors, errors);
    setValidURL(res);
    setPreview_image(urlInput);
  };

  useEffect(() => {
    if (preview_image) {
      setURLAndCheckURL(preview_image);
    }
  }, [preview_image]);

  useEffect(() => {
    setErrors([]);
  }, [validURL]);

  useEffect(() => {
    const newError = [];
    if (name.length === 0) newError.push('Name is required');
    if (name.length > 64) newError.push('Name must be less than 64 characters');
    if (name.length !== name.trim().length) newError.push('Name cannot have leading or trailing spaces');

    if (username.length === 0) newError.push('Username is required');
    if (username.length < 4) newError.push('Username must be at least 4 characters');
    if (username.length !== username.trim().length) newError.push('Username cannot have leading or trailing spaces');
    if (username.length > 50) newError.push('Username must be less than 50 characters');

    if (email.length === 0) newError.push('Email is required');
    if (email.length > 255) newError.push('Email must be less than 255 characters');
    if (email.length > 0 && !email.includes('@')) {
      newError.push('Email must be a valid email address (with @)');
    }

    if (email.length > 0 && !email.includes('.')) {
      newError.push('Email must be a valid email address (with .)');
    }

    if (email.length !== email.trim().length) newError.push('Email cannot have leading or trailing spaces');

    if (password.length === 0) newError.push('Password is required');
    if (repeatPassword.length === 0) newError.push('Please confirm your password');
    if (password.length !== password.trim().length) newError.push('Password cannot have leading or trailing spaces');
    if (repeatPassword.length !== repeatPassword.trim().length) newError.push('Password confirmation cannot have leading or trailing spaces');


    if (password !== repeatPassword) newError.push('Passwords must match');
    if (password.length < 6) newError.push('Password must be at least 6 characters');
   
    
    if (username.length > 50) newError.push('Username must be less than 50 characters');
    
    if (password.length > 64) newError.push('Password must be less than 64 characters');
    if (repeatPassword.length > 64) newError.push('Password confirmation must be less than 64 characters');

    if (preview_image){
      if (!validURL) {
        newError.push(
          "Invalid URL: Please enter a valid URL ending in - jpg/jpeg/png/webp/avif/gif/svg. Also please make sure this image CORS policy compliant. Image can be blocked by CORS policy due to: No 'Access-Control-Allow-Origin' header being present on the requested resource."
        );
      }

    }


    
    setErrors(newError);
  }, [password, repeatPassword, username, email, name, preview_image, validURL]);

  

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, repeatPassword, name, preview_image));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updatePreview_image = (e) => {
    setPreview_image(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-page flex'>
      <form onSubmit={onSignUp} className='login'>
        <div>
          <h1>
            Sign Up
          </h1>
         
          <h3>
            Already have an account?
            <Link to='/login' className='link'>
              <span className='h2-span'>Login here </span>
            </Link>
          </h3>
          <label>* User Name</label>
          <div className='hints'>Username should be between 4 and 50 characters</div>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            required={true}
            minLength='4'
            maxLength='50'
          ></input>
        </div>
        <div>
          <label>* Name</label>
          <div className='hints'>Name should be between 4 and 64 characters</div>
          <input
            type='text'
            name='name'
            onChange={updateName}
            value={name}
            required={true}
            minLength='4'
            maxLength='64'
          ></input>
        </div>
        <div>
          <label>* Email</label>
          <input
            type='email'
            name='email'
            onChange={updateEmail}
            value={email}
            required={true}
            minLength='2'
            maxLength='255'
          ></input>
        </div>
        <div>
          <label>* Password</label>
          <div className='hints'>Password should between 6 and 64 characters, and also include at least one uppercase letter,  one lowercase letter, one number, and one special character(!@#$%^&*()_+)</div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            required={true}
            minLength='6'
          ></input>
        </div>
        <div>
          <label>* Repeat Password</label>
          <div className='hints'>Repeat Password should be the same as password</div>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div>
          <label>Preview Image</label>
          <input
            type='text'
            name='preview_image'
            placeholder=""
            onChange={updatePreview_image}
            value={preview_image}
          ></input>
        </div>

        {errors.length > 0 && (
          <div className='error-title'>
            Please correct the following errors before submit:
          </div>
        )}

        {errors.length > 0 && (
          <ol className='error'>
            {errors.map((err, i) => (
              <li key={i} className='error-item'>{err}</li>
            ))}
          </ol>
        )}
        <button type="submit"
          disabled={
            password.length < 6 || password.length === 0 ||
            repeatPassword.length < 6 || repeatPassword.length === 0 || password !== repeatPassword ||
            username.length < 4 || username.length > 50 ||
            name.length < 4 || name.length > 64 ||
            email.length < 1 || email.length > 255 || errors.length > 0

          }
          className={`submit-btn ${password.length < 6 || password.length === 0 ||
              repeatPassword.length < 6 || repeatPassword.length === 0 || password !== repeatPassword ||
              username.length < 4 || username.length > 50 ||
              name.length < 4 || name.length > 64 ||
              email.length < 1 || email.length > 255 || errors.length > 0
              ? "disabled"
              : "enabled"
            }`}
        >
          Sign Up
        </button>
      </form>
      <div className='auth-img-div'>
        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662604451/Hikinglp/349d45d4bb3e76c72a4475b9163de5cc_aalzeg.jpg' className='auth-img' />

      </div>

    </div>

  );
};

export default SignUpForm;
