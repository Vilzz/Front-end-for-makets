import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateBasket, getBasket } from '../../actions/basket';
import PropTypes from 'prop-types';

const Ordermodal = ({
  modalToggle,
  maketDataForBasket,
  updateBasket,
  getBasket,
  basket,
  basketLoading,
  user,
  userLoading,
}) => {
  useEffect(() => {
    if (!basketLoading && basket !== null) {
      getBasket(basket.data._id);
    } else if (!userLoading && user !== null) {
      getBasket(user.data.basketid);
    }
    // eslint-disable-next-line
  }, [getBasket, basketLoading, userLoading]);
  // Список параметров строки передающихся в модальное окно по клику
  const {
    maketname,
    scalesize,
    w_netto,
    height,
    price,
  } = maketDataForBasket;

  //Сюда получаем уже добавленные в корзину в базе данных  макеты
  const [itemsData, setItemsData] = useState({
    id: '',
    items: [],
  });

  //Получаем элементы корзины из базы и сохраняем в стейт
  useEffect(() => {
    setItemsData({
      id: !basketLoading && basket !== null ? basket.data._id : '',
      items: !basketLoading && basket !== null ? basket.data.items : [],
    });
  }, [basket, basketLoading]);

  const [itemForBasket, setItemForBasket] = useState({
    item: '',
    scale: '',
    price: '',
    packing: '',
    packingprice: '',
    qty: '',
    rowsum: '',
  });

  // Формирование нового обьекта из модального окна
  useEffect(() => {
    setItemForBasket({
      item: maketDataForBasket.maketid,
      scale: maketDataForBasket.scalesize,
      price: maketDataForBasket.price,
      packing: '5ece8a357939f065943fdc24',
      packingprice: maketDataForBasket.packing.filter(
        (pack) => pack.id === '5ece8a357939f065943fdc24'
      )[0].addcost,
      qty: 1,
      rowsum: maketDataForBasket.price,
    });
  }, [maketDataForBasket]);

  const clickInc = () => {
    setItemForBasket({
      ...itemForBasket,
      qty: itemForBasket.qty + 1,
      rowsum:
        (itemForBasket.price + itemForBasket.packingprice) *
        (itemForBasket.qty + 1),
    });
  };

  const clickDec = () => {
    if (itemForBasket.qty > 1) {
      setItemForBasket({
        ...itemForBasket,
        qty: itemForBasket.qty - 1,
        rowsum:
          (itemForBasket.price + itemForBasket.packingprice) *
          (itemForBasket.qty - 1),
      });
    }
  };

  const packingChange = (e) => {
    const packingprice = maketDataForBasket.packing.filter(
      (pack) => pack.id === e.target.value
    )[0].addcost;
    setItemForBasket({
      ...itemForBasket,
      packing: e.target.value,
      packingprice,
      rowsum: (itemForBasket.price + packingprice) * itemForBasket.qty,
    });
  };

  const pushToBasket = (e) => {
    e.preventDefault();
    // Фильтруем временный массив - оставляем только с одинаковым id
    const filterEqId = itemsData.items.filter(
      (item) => item.item._id === itemForBasket.item
    );
    // Массив для фильтрации элементов
    let groupEqId = [];
    // Если есть элементы с одинаковым id
    if (filterEqId.length > 0) {
      // Фильтруем элементы, оставляем только с отличающимся масштабом
      const filterEqIdNotEqScales = filterEqId.filter(
        (item) => item.scale !== itemForBasket.scale
      );
      // Фильтруем с одинаковым масштабом, но разной упаковкой
      const filterEqIdNotEqPacking = filterEqId.filter((item) => {
        return (
          item.packing.addtoprice !== itemForBasket.packingprice &&
          item.scale === itemForBasket.scale
        );
      });

      // Объединяем результаты фильтров
      groupEqId = filterEqIdNotEqScales.concat(filterEqIdNotEqPacking);

      // Добавляем новый элемент
      groupEqId.push(itemForBasket);
    } else {
      // если не нашлось элементов с одинаковым id  просто добавляем новый элемент
      groupEqId.push(itemForBasket);
    }
    // Фильтруем элементы с отличающимся id
    const filterNotEqId = itemsData.items.filter(
      (item) => item.item._id !== itemForBasket.item
    );
    // Соединяем результаты фильтрации
    const filteredArray = groupEqId.concat(filterNotEqId);

    // Считаем итого
    const total = filteredArray
      .map((item) => item.rowsum)
      .reduce((sum, item) => sum + item);
    // Закрываем модальное окно
    modalClose(e);
    // Сохраняем результат в базу
    updateBasket({ items: filteredArray, total }, itemsData.id);
  };

  const modalClose = (e) => {
    modalToggle(e);
  };

  return (
    <div className='modalbg'>
      <div className='ordermodal'>
        <div className='header-row mb-3'>
          <h4>Добавить в корзину</h4>
          <i
            className='far fa-times-circle close'
            onClick={(e) => modalClose(e)}
          ></i>
        </div>
        <hr />
        <form className='form' onSubmit={(e) => pushToBasket(e)}>
          <div className='my-form-group'>
            <div>Макет:</div>
            <div>{maketname}</div>
          </div>
          <div className='my-form-group'>
            <div>Маштаб:</div>
            <div>
              <i className='fas fa-check-double'></i> 1:{scalesize}
            </div>
          </div>
          <div className='my-form-group'>
            <div>Вес:</div>
            <div>
              <i className='fas fa-balance-scale'></i> {w_netto} гр.
            </div>
          </div>
          <div className='my-form-group'>
            <div>Размер:</div>
            <div>
              <i className='fas fa-ruler-combined'></i> {height} мм
            </div>
          </div>
          <div className='my-form-group'>
            <div>Упаковка: </div>
            <div>
              <select
                className='form-control form-control-sm'
                onChange={(e) => packingChange(e)}
                value={itemForBasket.packing}
              >
                {maketDataForBasket.packing.map((pack) => (
                  <option value={pack.id} key={pack.id}>
                    {pack.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='my-form-group'>
            <div>Цена макета:</div>
            <div>
              <i className='fas fa-ruble-sign'></i> {price} руб.
            </div>
          </div>
          <div className='my-form-group'>
            <div>Цена упаковки:</div>
            <div>
              <i className='fas fa-ruble-sign'></i> {itemForBasket.packingprice}{' '}
              руб.
            </div>
          </div>
          <div className='my-form-group'>
            <div>Количество:</div>
            <div className='qty'>
              <div className='num'>{itemForBasket.qty} шт.</div>
              <div className='inc' onClick={() => clickInc()}>
                <i className='fas fa-plus'></i>
              </div>
              <div className='dec' onClick={() => clickDec()}>
                <i className='fas fa-minus'></i>
              </div>
            </div>
          </div>

          <div className='my-form-group'>
            <div>Сумма:</div>
            <div>
              <i className='fas fa-ruble-sign'></i>{' '}
              {(itemForBasket.packingprice + price) * itemForBasket.qty}
              руб.
            </div>
          </div>
          <div className='my-input-group'>
            <input
              className='btn btn-sm btn-my-ocean mr-2'
              type='submit'
              value='Добавить в корзину'
            />
            <button
              className='btn btn-sm btn-my-danger'
              onClick={(e) => modalClose(e)}
            >
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Ordermodal.propTypes = {
  modalToggle: PropTypes.func.isRequired,
  maketDataForBasket: PropTypes.object,
  updateBasket: PropTypes.func.isRequired,
  getBasket: PropTypes.func.isRequired,
  basket: PropTypes.object,
  basketLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userLoading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  basket: state.basket.basket,
  basketLoading: state.basket.loading,
  user: state.auth.user,
  userLoading: state.auth.loading,
});
export default connect(mapStateToProps, {
  updateBasket,
  getBasket,
})(Ordermodal);
