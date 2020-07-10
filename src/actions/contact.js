import axios from 'axios';
import { setAlert } from './alert';
import { GET_CONTACT, UPDATE_CONTACT, CONTACT_ERROR } from './types';

export const getContact = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/contact/${id}`);
    dispatch({
      type: GET_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateContact = (dataToUpdate, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/v1/contact/${id}`, dataToUpdate, config);
    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data,
    });
    dispatch(setAlert('Контактная информация обновлена', 'success', 2000));
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
