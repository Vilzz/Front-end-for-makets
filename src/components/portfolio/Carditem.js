import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearMakets } from '../../actions/makets';
import PropTypes from 'prop-types';

const Carditem = ({ itemsData, clearMakets }) => {
  const onClick = (e) => {
    clearMakets();
  };
  return itemsData.map((item, idx) => (
    <section
      className='mycard'
      data-aos={idx % 2 && idx > 0 ? 'fade-left' : 'fade-right'}
      key={item.id}
    >
      <div className='img'>
        <img src={`/images/${item.image}`} alt='one' />
      </div>

      <div className='mycard-desc'>
        <h3>{item.maketname}</h3>
        <p>{item.shortdesc}</p>
        <p>{item.description}</p>
        <p>Масштабы: {item.scales}</p>
        <Link
          to={`/maket/${item.slug}`}
          className='btn btn-block btn-my-ocean'
          onClick={(e) => onClick(e)}
        >
          Подробнее
        </Link>
      </div>
    </section>
  ));
};

Carditem.propTypes = {
  itemsData: PropTypes.array.isRequired,
  clearMakets: PropTypes.func.isRequired,
};

export default connect(null, { clearMakets })(Carditem);
