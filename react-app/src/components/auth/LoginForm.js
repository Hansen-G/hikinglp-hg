import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Link } from 'react-router-dom';
import './Auth.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    let demoEmail = 'demo@aa.io';
    let demoPassword = 'password'

    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-page flex'>
      <form onSubmit={onLogin} className='login'>
        <h1>
          Login
        </h1>
        <h3>
          Do not have an account?     <Link to='/sign-up' className='link'>
            <span className='h2-span'>Sign up here </span>
          </Link>
        </h3>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />

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

          
        </div>

        <div className='login-btn flex'>
          <button type='submit'

            disabled={
              password.length < 6 || password.length === 0 ||
              email.length < 1 || email.length > 255

            }

            className={`submit-btn ${password.length < 6 || password.length === 0 ||
              email.length < 1 || email.length > 255
              ? "disabled"
              : "enabled"
              }`}

          >Login</button>

          <button type='button' onClick={demoLogin} className='submit-btn demo'>Demo Login</button>



        </div>
        
      </form>

      <div className='auth-img-div'>
        <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662604451/Hikinglp/349d45d4bb3e76c72a4475b9163de5cc_aalzeg.jpg' className='auth-img'/>

      </div>

    </div>
   
  );
};

export default LoginForm;
