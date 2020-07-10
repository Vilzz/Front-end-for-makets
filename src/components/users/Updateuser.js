import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../dashboard/Navbar';
import { connect } from 'react-redux';
import { getUser, updateUser, clearUser } from '../../actions/users';
import PropTypes from 'prop-types';

const Updateuser = ({
  loading,
  user,
  getUser,
  clearUser,
  updateUser,
  match,
  history,
}) => {
  const { id } = match.params;

  const [userData, setUserData] = useState({
    address: '',
    phone: '',
    role: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    getUser(id);
  }, [getUser, id]);

  useEffect(() => {
    setUserData({
      address: !loading && user !== null ? user.data.address : '',
      phone: !loading && user !== null ? user.data.phone : '',
      role: !loading && user !== null ? user.data.role : '',
      name: !loading && user !== null ? user.data.name : '',
      email: !loading && user !== null ? user.data.email : '',
    });
  }, [loading, user]);

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(id, userData, history);
    clearUser();
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-sm-12 col-lg-6'>
          <h2>
            <i className='fas fa-user-edit mr-3'></i>Изменить данные
            пользователя
          </h2>
        </div>
      </div>

      <hr />
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label htmlFor='name'>Имя пользователя</label>
          <input
            type='text'
            className='form-control form-control-sm'
            id='name'
            name='name'
            value={userData.name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Электронная почта</label>
          <input
            type='text'
            className='form-control form-control-sm'
            id='email'
            name='email'
            value={userData.email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='role'>Роль пользователя</label>
          <select
            type='text'
            className='form-control form-control-sm'
            id='role'
            name='role'
            value={userData.role}
            onChange={(e) => onChange(e)}
          >
            <option value='user'>Пользователь</option>
            <option value='admin'>Администратор</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Адрес</label>
          <input
            type='text'
            className='form-control form-control-sm'
            id='address'
            name='address'
            value={userData.address}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Номер телефона</label>
          <input
            type='text'
            className='form-control form-control-sm'
            id='phone'
            name='phone'
            value={userData.phone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-my-ocean mr-2'
          value='Сохранить'
        />
        <Link className='btn btn-my-ocean' to='/admindashboard/users'>
          Вернуться к списку пользователей
        </Link>
      </form>
    </div>
  );
};

Updateuser.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.users.user,
  loading: state.users.loading,
});

export default connect(mapStateToProps, { getUser, updateUser, clearUser })(
  Updateuser
);
