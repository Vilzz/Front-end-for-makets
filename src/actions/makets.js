import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_MAKETS_LIST,
  GET_MAKET,
  CLEAR_MAKET,
  CLEAR_MAKETS,
  MAKETS_ERROR,
  CREATE_MAKET,
  MAKET_ERROR,
  UPDATE_MAKET,
  DELETE_MAKET,
  ADD_IMAGE,
  GET_IMAGES,
  CLEAR_IMAGES,
} from './types';

export const getMaketsByCategory = (id = '5e9833fcbcc61754db381de9') => async (
  dispatch
) => {
  try {
    const res = await axios.get(`/api/v1/makets?category[in]=${id}`);
    dispatch({
      type: GET_MAKETS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKETS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getMaketsList = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/makets');
    dispatch({
      type: GET_MAKETS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKETS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getFilteredMakets = (filter) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/makets?${filter}`);
    dispatch({
      type: GET_MAKETS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKETS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createMaket = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/makets', formData, config);
    dispatch({
      type: CREATE_MAKET,
      payload: res.data,
    });
    dispatch(setAlert('Макет добавлен', 'success', 2000));
    history.push('/admindashboard/makets');
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: MAKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const getMaketByID = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/makets/${id}`);
    dispatch({
      type: GET_MAKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const getMaketBySlug = (slug) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/makets/slug/${slug}`);
    dispatch({
      type: GET_MAKET,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const clearMaket = () => (dispatch) => {
  dispatch({ type: CLEAR_MAKET });
};
export const clearMakets = () => (dispatch) => {
  dispatch({ type: CLEAR_MAKETS });
};

export const updateMaket = (formData, id, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.put(`/api/v1/makets/${id}`, formData, config);
    dispatch({
      type: UPDATE_MAKET,
      payload: res.data,
    });

    dispatch(setAlert('Макет обновлен', 'success', 2000));
    history.push('/admindashboard/makets');
  } catch (err) {
    // const errors = err.response.data.error.split(',');
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    // }
    dispatch({
      type: MAKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteMaket = (id) => async (dispatch) => {
  if (window.confirm('удалить макет?')) {
    try {
      await axios.delete(`/api/v1/makets/${id}`);
      dispatch({
        type: DELETE_MAKET,
        payload: id,
      });
      dispatch(setAlert(`Макет ${id} удален`, 'success', 2000));
    } catch (err) {
      dispatch({
        type: MAKET_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

export const getImages = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/makets/images');
    dispatch({
      type: GET_IMAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MAKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const clearImages = () => (dispatch) => {
  dispatch({ type: CLEAR_IMAGES });
};

export const addImage = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.put(`/api/v1/makets/image`, formData, config);

    dispatch({
      type: ADD_IMAGE,
      payload: res.data,
    });
    dispatch(setAlert('Изображение добавлено', 'success', 2000));
    id === '1'
      ? history.push('/admindashboard/addmaket')
      : history.push(`/admindashboard/editmaket/${id}`);
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: MAKET_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
