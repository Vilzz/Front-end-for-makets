import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  CATEGORIES_ERROR,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  CLEAR_CATEGORY,
  DELETE_CATEGORY,
  CLEAR_CATEGORIES,
} from './types';

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/category');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getCategoryByID = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/category/${id}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const clearCategory = () => (dispatch) => {
  dispatch({ type: CLEAR_CATEGORY });
};
export const clearCategories = () => (dispatch) => {
  dispatch({ type: CLEAR_CATEGORIES });
};

export const updateCategory = (dataToUpdate, id, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/v1/category/${id}`, dataToUpdate, config);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert('Категория обновлена', 'success', 1000));
    history.push('/admindashboard/getcategories');
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const createCategory = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/v1/category', formData, config);
    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert('Категория добавлена', 'success', 1000));
    history.push('/admindashboard/getcategories');
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: CATEGORIES_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  if (window.confirm('удалить категорию?')) {
    try {
      const res = await axios.get(`/api/v1/makets?category=${id}&select=count`);

      if (res.data.count === 0) {
        await axios.delete(`/api/v1/category/${id}`);
        dispatch({
          type: DELETE_CATEGORY,
          payload: id,
        });
        dispatch(setAlert(`Категория ${id} удалена`, 'success', 2000));
      } else {
        dispatch(
          setAlert(`Нельзя удалить не пустую категорию`, 'danger', 2000)
        );
      }
    } catch (err) {
      dispatch({
        type: CATEGORIES_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
