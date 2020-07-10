import {
  GET_USERS,
  GET_USER,
  CLEAR_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/users');
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const clearUser = () => async (dispatch) => {
  dispatch({ type: CLEAR_USER });
};

export const deleteUser = (id) => async (dispatch) => {
  if (window.confirm('Удалить пользователя?')) {
    try {
      await axios.delete(`/api/v1/users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
      dispatch(setAlert(`Пользователь ${id} удален`, 'success', 1500));
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/users/${id}`);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const updateUser = (id, userData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/v1/users/${id}`, userData, config);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    dispatch(setAlert('Данные пользователя обновлены', 'success', 2000));
    history.push('/admindashboard/users');
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addUser = (userData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/v1/users', userData, config);
    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
    dispatch(
      setAlert(`Создан новый пользователь - ${userData.name} `, 'success', 2000)
    );
    history.push('/admindashboard/users');
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
