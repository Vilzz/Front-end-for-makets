import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../actions/users';

import Navbar from '../dashboard/Navbar';
import Spinner from '../layout/Spinner';
import './Users.scss';
import PropTypes from 'prop-types';

const Users = ({ loading, users, getUsers, deleteUser }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const delUser = (e) => {
    deleteUser(e.target.attributes.data.value);
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-sm-12 col-lg-6'>
          <h2>
            <i className='fas fa-users mr-3'></i> Пользователи
          </h2>
        </div>
      </div>

      <hr />
      {!loading && users !== null ? (
        <Fragment>
          <ul className='list-group list-group-horizontal userlist'>
            <li className='list-group-item bg-mydark'>#</li>
            <li className='list-group-item bg-mydark'>Имя</li>
            <li className='list-group-item bg-mydark'>Электронная почта</li>
            <li className='list-group-item bg-mydark'>Телефон</li>
            <li className='list-group-item bg-mydark'>Дата создания</li>
            <li className='list-group-item bg-mydark'>Роль</li>
            <li className='list-group-item bg-mydark'></li>
          </ul>
          {users.data.map((user, ind) => (
            <ul
              className='list-group list-group-horizontal userlist'
              key={user._id}
            >
              <li className='list-group-item'>{ind + 1}</li>
              <li className='list-group-item'>{user.name}</li>
              <li className='list-group-item'>{user.email}</li>
              <li className='list-group-item'>{user.phone}</li>
              <li
                className='list-group-item'
                style={{ textTransform: 'capitalize' }}
              >
                <Moment locale='ru' format='DD-MMMM-YYYY'>
                  {user.createdAt}
                </Moment>
              </li>
              <li className='list-group-item'>{user.role}</li>
              <li className='list-group-item'>
                <Link
                  to={`/admindashboard/updateuser/${user._id}`}
                  className='btn btn-sm btn-my-ocean mr-2'
                >
                  изм
                </Link>
                <button
                  data={user._id}
                  className='btn btn-sm btn-my-danger'
                  onClick={(e) => delUser(e)}
                >
                  удл
                </button>
              </li>
            </ul>
          ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

Users.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.object,
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  loading: state.users.loading,
  users: state.users.users,
});
export default connect(mapStateToProps, { getUsers, deleteUser })(Users);
