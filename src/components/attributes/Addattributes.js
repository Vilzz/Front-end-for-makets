import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createAttributes } from '../../actions/attributes';
import Navbar from '../dashboard/Navbar';
import PropTypes from 'prop-types';

const Addattributes = ({ createAttributes, match, history }) => {
  const { id } = match.params;

  const [attributes, setAttributes] = useState([]);
  const [attrRow, setAttrRow] = useState({});

  const onChange = (e) => {
    setAttrRow({
      ...attrRow,
      [e.target.name]: e.target.value,
    });
  };

  const addRow = (e) => {
    e.preventDefault();
    setAttributes([...attributes, { ...attrRow }]);
  };

  const delRow = (e) => {
    const ind = e.target.attributes.data.value;
    const newAttr = [...attributes];
    newAttr.splice(ind, 1);
    setAttributes([...newAttr]);
  };

  const saveAttributes = (e) => {
    createAttributes(id, attributes, history);
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <div className='col-sm-12 col-lg-6'>
          <h2>Добавить параметры к макету</h2>
        </div>
      </div>
      <hr />
      <div className='row'>
        <form className='form mt-3' onSubmit={(e) => addRow(e)}>
          <div className='form-row'>
            <div className='col'>
              <input
                name='scalesize'
                type='text'
                className='form-control form-control-sm'
                placeholder='Масштаб'
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='col'>
              <input
                name='price'
                type='text'
                className='form-control form-control-sm'
                placeholder='Цена'
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='col'>
              <input
                name='w_netto'
                type='text'
                className='form-control form-control-sm'
                placeholder='Вес нетто'
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='col'>
              <input
                name='w_bruto'
                type='text'
                className='form-control form-control-sm'
                placeholder='Вес бруто'
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='col'>
              <input
                name='height'
                type='text'
                className='form-control form-control-sm'
                placeholder='Размер'
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='col'>
              <input
                name='instock'
                type='text'
                className='form-control form-control-sm'
                placeholder='Остаток'
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='col'>
              <input
                name='minprodtime'
                type='text'
                className='form-control form-control-sm'
                placeholder='Мин. срок произв'
                onChange={(e) => onChange(e)}
              />
            </div>
            <button type='submit' className='btn btn-sm btn-my-ocean'>
              Добавить
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div className='row'>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th>Масштаб</th>
              <th>Цена</th>
              <th>Вес нетто</th>
              <th>Вес брутто</th>
              <th>Размер</th>
              <th>Остаток</th>
              <th>Срок производства</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attr, idx) => (
              <tr key={idx}>
                <td>{attr.scalesize}</td>
                <td>{attr.price}</td>
                <td>{attr.w_netto}</td>
                <td>{attr.w_bruto}</td>
                <td>{attr.height}</td>
                <td>{attr.instock}</td>
                <td>{attr.minprodtime}</td>
                <td>
                  <button
                    data={idx}
                    className='btn btn-my-sm btn-my-danger'
                    onClick={(e) => delRow(e)}
                  >
                    удл
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {attributes.length > 0 && (
        <div className='row'>
          <button
            className='btn btn-block btn-my-ocean'
            onClick={(e) => saveAttributes(e)}
          >
            Сохранить данные параметров
          </button>
        </div>
      )}
    </div>
  );
};

Addattributes.propTypes = {
  createAttributes: PropTypes.func.isRequired,
};

export default connect(null, { createAttributes })(Addattributes);
