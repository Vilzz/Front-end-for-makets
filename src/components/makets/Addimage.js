import React, { useState } from 'react';
import Navbar from '../dashboard/Navbar';
import { connect } from 'react-redux';
import { addImage } from '../../actions/makets';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Addimage = ({ addImage, history, match }) => {
  const { id } = match.params;

  const [filename, setFilename] = useState({
    name: 'Выбери новый файл изображения...',
    file: null,
    button: true,
  });

  const fileSelected = (e) => {
    setFilename({
      name: e.target.files[0].name,
      file: e.target.files[0],
      button: false,
    });
  };

  const pushImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', filename.file);
    addImage(formData, history, id);
    setFilename({
      name: 'Выбери новый файл изображения...',
      file: null,
      button: true,
    });
  };

  return (
    <div className='container component'>
      <Navbar />
      <h2>
        <i className='far fa-image mr-3'></i>Добавить файл изображения
      </h2>
      <hr />
      <div className='custom-file mt-3 mb-3'>
        <form onSubmit={(e) => pushImage(e)}>
          <input
            type='file'
            className='custom-file-input'
            id='validatedCustomFile'
            onChange={(e) => fileSelected(e)}
          />
          <label className='custom-file-label' htmlFor='validatedCustomFile'>
            {filename.name}
          </label>
          <input
            type='submit'
            value='Загрузить'
            className='btn btn-my-ocean btn-block mt-2'
            disabled={filename.button}
          />
        </form>
      </div>
      <hr />
      <Link
        to={
          id === '1'
            ? '/admindashboard/addmaket'
            : `/admindashboard/editmaket/${id}`
        }
        className='btn btn-my-ocean'
      >
        Назад
      </Link>
    </div>
  );
};

Addimage.propTypes = {
  addImage: PropTypes.func.isRequired,
};

export default connect(null, { addImage })(Addimage);
