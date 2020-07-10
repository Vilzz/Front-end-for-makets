import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getAttributesById,
  clearAttributes,
  deleteAttrGroup,
} from '../../actions/attributes';
import Navbar from '../dashboard/Navbar';
import Spinner from '../layout/Spinner';
import Addgroup from './Addgroup';

import './Attributes.scss';

import PropTypes from 'prop-types';

const Attributes = ({
  match,
  getAttributesById,
  clearAttributes,
  deleteAttrGroup,
  loading,
  attributes,
}) => {
  const { attrid, id } = match.params;
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getAttributesById(attrid);
  }, [attrid, getAttributesById]);

  const showModalClick = () => {
    setShowModal(!showModal);
  };

  const onClick = () => {
    clearAttributes();
  };

  const clickDelete = (e) => {
    const groupId = e.target.attributes.data.value;
    deleteAttrGroup(attrid, groupId);
  };
  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-sm-12 col-lg-6'>
          <h2>
            <i className='fas fa-drafting-compass mr-3'></i>Параметры макета:{' '}
            {!loading &&
              attributes !== null &&
              attributes.data.maketid.maketname}
          </h2>
        </div>
        <div className='col-sm-12 col-lg-6 flexhelper'>
          <button
            className='btn btn-my-ocean btn-sm mr-5'
            onClick={() => showModalClick()}
          >
            <i className='fas fa-folder-plus mr-2'></i> Добавить
          </button>
        </div>
      </div>
      <hr />
      <div className='row'>
        {!loading && attributes !== null ? (
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>{attributes.data.maketid.maketname}</th>
                {attributes.data.attributes.map((attr, idx) => (
                  <th key={idx}>1:{attr.scalesize}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Цена</td>
                {attributes.data.attributes.map((attr, idx) => (
                  <td key={idx}>{attr.price} руб. </td>
                ))}
              </tr>
              <tr>
                <td>Вес нетто</td>
                {attributes.data.attributes.map((attr, idx) => (
                  <td key={idx}>{attr.w_netto} гр. </td>
                ))}
              </tr>
              <tr>
                <td>Вес брутто</td>
                {attributes.data.attributes.map((attr, idx) => (
                  <td key={idx}>{attr.w_bruto} гр. </td>
                ))}
              </tr>
              <tr>
                <td>Размер</td>
                {attributes.data.attributes.map((attr, idx) => (
                  <td key={idx}>{attr.height} см. </td>
                ))}
              </tr>
              <tr>
                <td>Остаток</td>
                {attributes.data.attributes.map((attr, idx) => (
                  <td key={idx}>{attr.instock} шт. </td>
                ))}
              </tr>
              <tr>
                <td>Срок производства</td>
                {attributes.data.attributes.map((attr, idx) => (
                  <td key={idx}>{attr.minprodtime}</td>
                ))}
              </tr>
              <tr>
                <td></td>
                {attributes.data.attributes.map((attr) => (
                  <td key={attr._id}>
                    <button
                      data={attr._id}
                      className='btn btn-my-danger btn-my-sm'
                      onClick={(e) => clickDelete(e)}
                    >
                      удл
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
        <Link
          to={`/admindashboard/editmaket/${id}`}
          className='btn btn-my-ocean'
          onClick={() => onClick()}
        >
          Назад
        </Link>
      </div>
      {showModal && (
        <Addgroup showModalClick={showModalClick} attrid={attrid} />
      )}
    </div>
  );
};

Attributes.propTypes = {
  getAttributesById: PropTypes.func.isRequired,
  clearAttributes: PropTypes.func.isRequired,
  deleteAttrGroup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  attributes: PropTypes.object,
};
const mapStateToProps = (state) => ({
  loading: state.attributes.loading,
  attributes: state.attributes.attributes,
});

export default connect(mapStateToProps, {
  getAttributesById,
  clearAttributes,
  deleteAttrGroup,
})(Attributes);
