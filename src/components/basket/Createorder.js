import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBasket } from '../../actions/basket';
import { createOrder } from '../../actions/orders';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Createorder = ({
  createOrder,
  getBasket,
  userLoading,
  user,
  basketLoading,
  basket,
  history,
}) => {
  const [orderData, setOrderData] = useState({
    basketId: '',
    customerid: '',
    customeraddress: '',
    customername: '',
    customerphone: '',
    customeremail: '',
    items: [],
    orderdate: '',
    total: '',
    comment: '',
  });
  useEffect(() => {
    if (!userLoading && user !== null) {
      getBasket(user.data.basketid);
    }
    // eslint-disable-next-line
  }, [userLoading, user, getBasket]);

  useEffect(() => {
    if (!basketLoading && basket !== null) {
      setOrderData({
        ...orderData,
        basketId: basket.data._id,
        customerid: basket.data.customer._id,
        customeraddress: basket.data.customer.address,
        customername: basket.data.customer.name,
        customerphone: basket.data.customer.phone,
        customeremail: basket.data.customer.email,
        items: [...basket.data.items],
        orderdate: new Date(),
        total: basket.data.total,
      });
    }
    // eslint-disable-next-line
  }, [basketLoading, basket]);

  const setComment = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const pushOrder = () => {
    createOrder(orderData, history);
  };

  return (
    <div className='container component'>
      <div className='row'>
        <div className='col-sm-12'>
          <h2>Разместить заказ</h2>
          <h4>Информация о заказчике</h4>
          <h6>
            Имя: <span>{orderData.customername}</span>
          </h6>
          <h6>
            Адрес доставки: <span>{orderData.customeraddress}</span>
          </h6>
          <h6>
            Телефон контакта: <span>{orderData.customerphone}</span>
          </h6>
          <h6>
            Электронная почта: <span>{orderData.customeremail}</span>
          </h6>
          <h6>
            Дата:{' '}
            <span>
              <Moment locale='ru' format='DD-MMMM-YYYY'>
                {orderData.orderdate}
              </Moment>
            </span>
          </h6>
          <hr />
          <h4>Информация о заказе</h4>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>#</th>
                <th>Фото</th>
                <th>Наименование</th>
                <th>Масштаб</th>
                <th>Цена</th>
                <th>Упаковка</th>
                <th>Цена уп.</th>
                <th>Кол-во</th>
                <th>Всего</th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.length > 0 &&
                orderData.items.map((item, idx) => (
                  <tr key={item._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <img
                        src={`/images/${item.item.image}`}
                        style={{ width: '50px', borderRadius: '50%' }}
                        alt={item.item.maketname}
                      />
                    </td>
                    <td>{item.item.maketname}</td>
                    <td>1:{item.scale}</td>
                    <td>{item.price} руб.</td>
                    <td>{item.packing.name}</td>
                    <td>{item.packing.addtoprice} руб.</td>
                    <td>{item.qty} шт.</td>
                    <td>{item.rowsum} руб.</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <hr />
          <div className='float-right mr-5'>
            Общая сумма заказа:{' '}
            <span className='ml-4'>{orderData.total} руб.</span>
          </div>
        </div>
      </div>
      <hr />
      <div className='row justify-content-start'>
        <div className='form-group'>
          <label htmlFor='comment'>Комментарии</label>
          <textarea
            className='form-control mb-3'
            id='comment'
            name='comment'
            type='text'
            cols='150'
            rows='3'
            placeholder='Оставьте сообщение'
            onChange={(e) => setComment(e)}
          />
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-6'>
          <button className='btn btn-my-ocean mr-3' onClick={() => pushOrder()}>
            Отправить
          </button>
          <Link to='/basket' className='btn btn-my-ocean'>
            Вернуться в корзину
          </Link>
        </div>
      </div>
    </div>
  );
};

Createorder.propTypes = {
  createOrder: PropTypes.func.isRequired,
  getBasket: PropTypes.func.isRequired,
  userLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  basketLoading: PropTypes.bool.isRequired,
  basket: PropTypes.object,
};
const mapStateToProps = (state) => ({
  userLoading: state.auth.loading,
  user: state.auth.user,
  basketLoading: state.basket.loading,
  basket: state.basket.basket,
});
export default connect(mapStateToProps, { getBasket, createOrder })(
  Createorder
);
