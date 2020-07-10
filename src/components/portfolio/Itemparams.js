import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Ordermodal from './Ordermodal';
import PropTypes from 'prop-types';

const Itemparams = ({
  maketAttr,
  maketPacking,
  userId,
  maketId,
  maketName,
  maketImage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [maketDataForBasket, setMaketDataForBasket] = useState({
    maketid: '',
    customerid: '',
    maketname: '',
    scalesize: '',
    w_netto: '',
    height: '',
    instock: 0,
    packing: [],
    price: '',
    minprodtime: '',
  });

  useEffect(() => {
    setMaketDataForBasket({
      ...maketDataForBasket,
      maketid: maketId,
      maketname: maketName,
      maketimage: maketImage,
      customerid: userId,
    });
    // eslint-disable-next-line
  }, [maketId, userId, maketName, maketImage]);

  const modalToggle = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const setItemsDetailsForBasket = (e) => {
    const attrId = e.target.attributes.data.value;

    const rowData = maketAttr.attributes.filter((mak) => mak._id === attrId)[0];

    const rowPacking = maketPacking.map((maket) => {
      return { name: maket.name, id: maket._id, addcost: maket.addtoprice };
    });

    setMaketDataForBasket({
      ...maketDataForBasket,
      scalesize: rowData.scalesize,
      w_netto: rowData.w_netto,
      height: rowData.height,
      instock: rowData.instock,
      packing: rowPacking,
      price: rowData.price,
      minprodtime: rowData.minprodtime,
    });

    modalToggle(e);
  };

  const checkIsAuthButton = (userId, rowId) => {
    if (userId === null) {
      return (
        <Link className='btn btn-my-ocean btn-my-sm' to='/login'>
          <i className='fas fa-shopping-basket'></i>
          <span>В корзину</span>
        </Link>
      );
    } else {
      return (
        <button
          data={rowId}
          className='btn btn-my-ocean btn-my-sm'
          onClick={(e) => {
            setItemsDetailsForBasket(e);
          }}
        >
          <i data={rowId} className='fas fa-shopping-basket'></i>
          <span data={rowId}>В корзину</span>
        </button>
      );
    }
  };

  return (
    <Fragment>
      <div className='row p-2 params'>
        <h5>
          <span>Основные параметры макета:</span>
        </h5>
        <table className='table table-sm bd table-secondary table-responsive-sm'>
          <thead className='thead-dark'>
            <tr>
              <th scope='col'>Масштаб</th>
              <th scope='col'>Вес, гр</th>
              <th scope='col'>Размер</th>
              <th scope='col'>Наличие</th>
              <th scope='col'>Цена</th>
              <th scope='col'>Срок произ.</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {maketAttr.attributes.map((attr) => (
              <tr key={attr._id}>
                <td>
                  <h6 className='badge'>1:{attr.scalesize}</h6>
                </td>
                <td>
                  {attr.w_netto} <i className='fas fa-balance-scale'></i>
                  <span>гр.</span>
                </td>
                <td>
                  {attr.height} <i className='fas fa-ruler-combined'></i>
                  <span> мм</span>
                </td>
                <td>
                  {attr.instock} <span>шт.</span>
                </td>
                <td>
                  <i className='fas fa-ruble-sign mr-1'></i>
                  {attr.price}
                  <span> руб.</span>
                </td>
                <td className={attr.instock === 0 ? 'redtext' : ''}>
                  {attr.minprodtime < 5 ? (
                    <Fragment>
                      {attr.minprodtime} <i className='far fa-calendar-alt'></i>
                      <span> дня</span>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {attr.minprodtime} <i className='far fa-calendar-alt'></i>
                      <span> дней</span>
                    </Fragment>
                  )}
                </td>
                <td>{checkIsAuthButton(userId, attr._id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Ordermodal
          modalToggle={modalToggle}
          maketDataForBasket={maketDataForBasket}
        />
      )}
    </Fragment>
  );
};

Itemparams.propTypes = {
  maketAttr: PropTypes.object.isRequired,
  maketPacking: PropTypes.array.isRequired,
  userId: PropTypes.string,
  maketId: PropTypes.string,
  maketName: PropTypes.string,
  maketImage: PropTypes.string,
};

export default Itemparams;
