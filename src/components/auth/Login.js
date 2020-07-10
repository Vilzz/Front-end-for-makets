import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

import PropTypes from 'prop-types';

const Login = ({ login, auth: { isAuthenticated }, user, setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  if (user !== null) {
    if (user.data.role === 'owner' || user.data.role === 'admin') {
      return <Redirect to='/admindashboard' />;
    } else if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
  }

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setAlert('Требуется ввести электронную почту', 'danger', 1500);
    } else if (password === '') {
      setAlert('Требуется ввести пароль', 'danger', 1500);
    } else {
      login({ email, password });
    }
  };

  return (
    <div className='container login'>
      <h1 className='x-large'>Вход в аккаунт</h1>
      <p className='lead'>
        <i className='fas fa-user mr-2'></i>
        Войти в аккаунт
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Электронная почта'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Пароль'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input
          type='submit'
          className='btn btn-my-ocean btn-block'
          value='Войти'
        />
      </form>
      <p className='mt-3'>
        Нет аккаунта?{' '}
        <Link className='dg' to='/register'>
          Зарегистрироваться
        </Link>
      </p>
      <p className='mt-3'>
        Забыли пароль?{' '}
        <Link className='dg' to='/forgotpassword'>
          Сбросить пароль
        </Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
