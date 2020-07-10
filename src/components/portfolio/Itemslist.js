import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/category';
import { getMaketsByCategory } from '../../actions/makets';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Portfoliomenu from './Portfoliomenu';
import './Portfolio.scss';
import Carditem from './Carditem';
import Spinner from '../layout/Spinner';

import PropTypes from 'prop-types';

const Itemslist = ({
  loading,
  categories,
  mloading,
  makets,
  getCategories,
  getMaketsByCategory,
}) => {
  const [catData, setCatData] = useState({
    id: '5e9833fcbcc61754db381de9',
    ctgname: 'Космос',
  });
  const [menu, setMenu] = useState([]);

  const [maketsForShow, setMaketsForShow] = useState([]);

  useEffect(() => {
    AOS.init({
      offset: 400,
      duration: 1000,
    });
    getCategories();
    getMaketsByCategory();
  }, [getCategories, getMaketsByCategory]);

  useEffect(() => {
    setMenu(
      !loading && categories !== null
        ? categories.data
            .filter((category) => category.showonmain === true)
            .map((category) => {
              return {
                ctgname: category.categoryname,
                id: category._id,
              };
            })
        : []
    );
    setMaketsForShow(
      !mloading && makets !== null
        ? makets.data.map((maket) => {
            return {
              image: maket.image,
              id: maket._id,
              maketname: maket.maketname,
              shortdesc: maket.shortdesc,
              description: maket.description,
              scales: maket.attributes
                ? maket.attributes.attributes
                    .map((attr) => attr.scalesize)
                    .toString()
                : '',
              slug: maket.slug,
            };
          })
        : []
    );
  }, [loading, categories, mloading, makets]);

  const getItems = (e) => {
    getMaketsByCategory(e.target.attributes.data.value);
    setCatData({ id: e.target.attributes.data.value, ctgname: e.target.value });
  };

  return (
    <div>
      <div className='leftarrow'>
        <i className='fas fa-angle-double-down'></i>
      </div>
      <div className='rightarrow'>
        <i className='fas fa-angle-double-down'></i>
      </div>

      <header className='main-header'>
        <h1>{catData.ctgname}</h1>
        <p>Изделия в категории {catData.ctgname}</p>
      </header>
      <hr />
      <main className='container showcards'>
        {!loading && categories !== null ? (
          <Portfoliomenu menu={menu} getItems={getItems} />
        ) : (
          <Spinner />
        )}

        <Carditem itemsData={maketsForShow}></Carditem>
      </main>
    </div>
  );
};

Itemslist.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getMaketsByCategory: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  categories: PropTypes.object,
  mloading: PropTypes.bool.isRequired,
  makets: PropTypes.object,
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  loading: state.categories.loading,
  makets: state.makets.makets,
  mloading: state.makets.loading,
});

export default connect(mapStateToProps, { getCategories, getMaketsByCategory })(
  Itemslist
);
