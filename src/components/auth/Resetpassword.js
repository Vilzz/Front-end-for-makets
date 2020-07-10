import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { setNewPassword } from '../../actions/auth';
import PropTypes from 'prop-types';

const Resetpassword = ({
  setAlert,
  setNewPassword,
  isAuthenticated,
  match,
}) => {
  const { resettoken } = match.params;
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });
  const { password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Пароли не совпадают', 'danger', 2000);
    } else {
      setNewPassword({ password, resettoken });
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/portfolio' />;
  }
  return (
    <div className='container login'>
      <h1 className='x-large'>Смена пароля</h1>
      <p className='lead'>
        <i className='fas fa-key mr-3'></i>
        Изменить пароль
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
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
          value='Изменить пароль'
        />
      </form>
    </div>
  );
};

Resetpassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setNewPassword, setAlert })(
  Resetpassword
);
