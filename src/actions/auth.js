import axios from 'axios';
import { setAlert } from './alert';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  PASSWORD_CHANGED,
  ADDRESS_UPDATE,
  PHONE_UPDATE,
  UPDATE_ERROR,
} from './types';
import { createBasket } from './basket';

import setAuthToken from '../utils/setAuthToken';

export const updatePhone = (id, phone) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const updateData = {
    id,
    ...phone,
  };
  try {
    const res = await axios.put(
      '/api/v1/auth/updateprofilephone',
      updateData,
      config
    );
    dispatch({
      type: PHONE_UPDATE,
      payload: res.data,
    });
    dispatch(setAlert('Контактный номер изменен', 'success', 2000));
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger', 3000)));
    }
    dispatch({
      type: UPDATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateUserAddress = (id, address) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const updateData = {
    id,
    address,
  };
  try {
    const res = await axios.put(
      '/api/v1/auth/updateprofileaddress',
      updateData,
      config
    );
    dispatch({
      type: ADDRESS_UPDATE,
      payload: res.data,
    });
    dispatch(setAlert('Адрес изменен', 'success', 2000));
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger', 3000)));
    }
    dispatch({
      type: UPDATE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('/api/v1/auth/me');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = ({ name, email, password }, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/v1/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token: res.data.token,
        isAuthenticated: res.data.isAuthenticated,
        success: res.data.success,
      },
    });
    await dispatch(loadUser());
    await dispatch(createBasket({ customer: res.data.id }));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger', 2000)));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/v1/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger', 2000)));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};

export const forgotPassword = ({ email }) => async (dispatch) => {
  const body = JSON.stringify({ email });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    await axios.post('/api/v1/auth/forgotpassword', body, config);
    dispatch(
      setAlert(
        'Мы отправили ссылку на сброс пароля на указанный вами почтовый адрес',
        'success',
        1500
      )
    );
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger', 2000)));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const setNewPassword = ({ password, resettoken }) => async (
  dispatch
) => {
  const body = JSON.stringify({ password });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `/api/v1/auth/resetpassword/${resettoken}`,
      body,
      config
    );
    dispatch({
      type: PASSWORD_CHANGED,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert('Пароль успешно изменен', 'success', 2000));
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger', 2000)));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
