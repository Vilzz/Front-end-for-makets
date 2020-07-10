import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBasket, deleteBasketRow, deleteBasket } from '../../actions/basket';
//import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Basket = ({
  deleteBasket,
  deleteBasketRow,
  getBasket,
  basketLoading,
  basket,
  user,
  userLoading,
  history,
}) => {
  const [basketId, setBasketId] = useState('');
  const [basketData, setBasketData] = useState({
    basketTotal: '',
    items: [],
  });

  useEffect(() => {
    if (!userLoading && user !== null && user.data.basketid) {
      getBasket(user.data.basketid);
      setBasketId(user.data.basketid);
    } else if (!basketLoading && basket !== null) {
      getBasket(basket.data._id);
      setBasketId(basket.data._id);
    }
    // eslint-disable-next-line
  }, [userLoading, user, getBasket, basketLoading]);

  useEffect(() => {
    if (!basketLoading && basket !== null) {
      setBasketData({
        ...basketData,
        basketTotal: basket.data.total,
        items: basket.data.items,
      });
    }
    // eslint-disable-next-line
  }, [basketLoading, basket]);

  const delBasketRow = (e) => {
    const itemId = e.target.attributes.data.value;
    deleteBasketRow(basketId, itemId);
  };

  const clearBtn = () => {
    deleteBasket(basketId, history);
  };

  return (
    <div className='container component'>
      <div className='row align-items-center'>
        <div className='col-sm-6'>
          <h2>
            <i className='fas fa-shopping-basket mr-3'></i>Корзина
          </h2>
        </div>
        <div className='col-sm-6 clearbasketbtn'>
          {basketData.items.length > 0 && (
            <button className='btn btn-my-danger' onClick={() => clearBtn()}>
              <i className='fas fa-ban mr-2'></i> Очистить корзину
            </button>
          )}
        </div>
      </div>

      <hr />
      <div className='row'>
        <div className='col-12'>
          {!basketLoading && basket !== null ? (
            <Fragment>
              {basketData.items.length > 0 ? (
                <Fragment>
                  <table className='table'>
                    <thead className='thead-dark'>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Изображение</th>
                        <th scope='col'>Наименование</th>
                        <th scope='col'>Масштаб</th>
                        <th scope='col'>Цена</th>
                        <th scope='col'>Упаковка</th>
                        <th scope='col'>Цена упаковки</th>
                        <th scope='col'>Количество</th>
                        <th scope='col'>Сумма</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {basketData.items.map((item, idx) => (
                        <tr key={item._id}>
                          <td>{idx + 1}</td>
                          <td>
                            {item.item.image && (
                              <img
                                src={`/images/${item.item.image}`}
                                style={{ width: '50px', borderRadius: '60%' }}
                                alt={item.item.maketname}
                              />
                            )}
                          </td>
                          <td>{item.item.maketname}</td>
                          <td>1:{item.scale}</td>
                          <td>{item.price} руб.</td>
                          <td>{item.packing.name}</td>
                          <td>{item.packing.addtoprice} руб.</td>
                          <td>{item.qty} шт</td>
                          <td>{item.rowsum} руб.</td>
                          <td>
                            <button
                              data={item._id}
                              className='btn btn-my-sm btn-my-danger'
                              onClick={(e) => delBasketRow(e)}
                            >
                              Удл
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <hr />
                  <div className='float-right mr-4'>
                    Всего:{' '}
                    <span className='ml-4'>{basketData.basketTotal} руб.</span>
                  </div>
                  <div className='row'>
                    <div className='col-12'>
                      <Link to='/portfolio' className='btn btn-my-ocean mr-3'>
                        Вернуться к списку макетов
                      </Link>
                      <Link to='/createorder' className='btn btn-my-ocean'>
                        Оформить заказ
                      </Link>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <h2>Корзина пуста</h2>
              )}
            </Fragment>
          ) : (
            <h2>Корзина пуста</h2>
          )}
        </div>
      </div>
    </div>
  );
};

Basket.propTypes = {
  getBasket: PropTypes.func.isRequired,
  basket: PropTypes.object,
  basketLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userLoading: PropTypes.bool.isRequired,
  deleteBasketRow: PropTypes.func.isRequired,
  deleteBasket: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  basket: state.basket.basket,
  basketLoading: state.basket.loading,
  user: state.auth.user,
  userLoading: state.auth.loading,
});

export default connect(mapStateToProps, {
  getBasket,
  deleteBasketRow,
  deleteBasket,
})(Basket);
