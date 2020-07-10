import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Пароли не совпадают', 'danger', 2000);
    } else {
      register({ name, email, password }, history);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div className='container register'>
      <h1 className='x-large'>Регистрация</h1>
      <p className='lead'>
        <i className='fas fa-user mr-2'></i>
        Создать аккаунт
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Имя'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
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
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Повторите пароль'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-my-ocean btn-block'
          value='Зарегистрировать'
        />
      </form>
      <p className='mt-3'>
        Уже зарегистрирован?{' '}
        <Link className='dg' to='/login'>
          Войти
        </Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
