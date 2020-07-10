import axios from 'axios';
import { setAlert } from './alert';
import {
  CREATE_PACKING,
  GET_PACKINGS,
  EDIT_PACKING,
  GET_PACKING,
  PACKING_ERROR,
  CLEAR_PACKING,
  DELETE_PACKING,
} from './types';

export const clearPacking = () => (dispatch) => {
  dispatch({
    type: CLEAR_PACKING,
  });
};

export const deletePacking = (id) => async (dispatch) => {
  if (window.confirm('Удалить упаковку?')) {
    try {
      await axios.delete(`/api/v1/packing/${id}`);
      dispatch({
        type: DELETE_PACKING,
        payload: id,
      });
      dispatch(setAlert(`Упаковка ${id} удалена`, 'success', 1000));
    } catch (err) {
      dispatch({
        type: PACKING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const getPackings = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/packing');
    dispatch({
      type: GET_PACKINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PACKING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPacking = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/packing/${id}`);
    dispatch({
      type: GET_PACKING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PACKING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editPacking = (newPackingData, id, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(
      `/api/v1/packing/${id}`,
      newPackingData,
      config
    );
    dispatch({
      type: EDIT_PACKING,
      payload: res.data,
    });
    dispatch(setAlert('Данные упаковки изменены', 'success', 1000));
    history.push('/admindashboard/packing');
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: PACKING_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const createPacking = (packingData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/v1/packing', packingData, config);
    dispatch({
      type: CREATE_PACKING,
      payload: res.data,
    });
    dispatch(setAlert('Вариант упаковки успешно добавлен', 'success', 1000));
    history.push('/admindashboard/packing');
  } catch (err) {
    const errors = err.response.data.error.split(',');
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: PACKING_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
