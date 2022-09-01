import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [preview_image, setPreview_image] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          placeholder="Username should be between 4 and 50 characters"
          onChange={updateUsername}
          value={username}
          required={true}
          minLength='4'
          maxLength='50'
        ></input>
      </div>
      <div>
        <label>Name</label>
        <input
          type='text'
          name='name'
          placeholder="Name should be between 4 and 64 characters"
          onChange={updateName}
          value={name}
          required={true}
          minLength='4'
          maxLength='64'
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder="Password should between 6 and 64 characters, and also include at least one uppercase letter,  one lowercase letter, one number, and one special character(!@#$%^&*()_+)"
          onChange={updatePassword}
          value={password}
          required={true}
          minLength='6'
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          placeholder="Repeat Password should be the same as password"
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
      <button type="submit"
        disabled={
          password.length < 6 || password.length === 0 ||
          repeatPassword.length < 6 || repeatPassword.length === 0 || password !== repeatPassword ||
          username.length < 4 || username.length > 50 || 
          name.length < 4 || name.length > 64 ||
          email.length < 1 || email.length > 255

        }
        className={`submit-btn ${
          password.length < 6 || password.length === 0 ||
          repeatPassword.length < 6 || repeatPassword.length === 0 || password !== repeatPassword ||
            username.length < 4 || username.length > 50 ||
            name.length < 4 || name.length > 64 ||
            email.length < 1 || email.length > 255
            ? "disabled"
            : "enabled"
          }`}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
