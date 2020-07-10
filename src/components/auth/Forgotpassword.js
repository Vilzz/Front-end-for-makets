import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Forgotpassword = ({ forgotPassword, setAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    email === ''
      ? setAlert('Вы забыли ввести адрес вашей почты', 'danger', 1500)
      : forgotPassword(formData);
  };
  return (
    <div className='container login'>
      <h1 className='x-large'>Восстановление пароля</h1>
      <p className='lead'>
        <i className='fas fa-users-cog mr-3'></i>
        Восстановить пароль
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            placeholder='Электронная почта'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input
          type='submit'
          className='btn btn-my-ocean btn-block'
          value='Отправить'
        />
      </form>
      <p className='mt-3'>
        Нет аккаунта?{' '}
        <Link className='dg' to='/register'>
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};

Forgotpassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { forgotPassword, setAlert })(Forgotpassword);
