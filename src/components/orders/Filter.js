import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ statusFilterOn, statusFilterOff }) => {
  const [filterStatus, setFilterStatus] = useState({
    applyFilter: true,
    status: '*Фильтровать по статусу',
  });

  const onChange = (e) => {
    setFilterStatus({
      applyFilter: false,
      status: e.target.value,
    });
  };
  const applyFilter = (e) => {
    statusFilterOn(filterStatus.status);
  };
  const clearFilter = () => {
    setFilterStatus({
      applyFilter: true,
      status: '*Фильтровать по статусу',
    });
    statusFilterOff();
  };

  return (
    <form className='form'>
      <div className='input-group'>
        <div className='input-group-append'>
          <select
            name='status'
            id='status'
            className='form-control form-control-sm'
            value={filterStatus.status}
            onChange={(e) => onChange(e)}
          >
            <option value='Статус' disabled={!filterStatus.applyFilter}>
              *Фильтровать по статусу
            </option>
            <option value='Новый'>Новый</option>
            <option value='Оплачен'>Оплачен</option>
            <option value='В работе'>В работе</option>
            <option value='Отменен'>Отменен</option>
            <option value='Выполнен'>Выполнен</option>
            <option value='Отправлен'>Отправлен</option>
          </select>
          <button
            className='btn btn-sm btn-my-ocean'
            type='button'
            disabled={filterStatus.applyFilter}
            onClick={() => applyFilter()}
          >
            Применить
          </button>
          <button
            onClick={() => clearFilter()}
            className='btn btn-sm btn-my-danger'
            type='button'
          >
            Очистить
          </button>
        </div>
      </div>
    </form>
  );
};

Filter.propTypes = {
  statusFilterOn: PropTypes.func.isRequired,
  statusFilterOff: PropTypes.func.isRequired,
};

export default Filter;
