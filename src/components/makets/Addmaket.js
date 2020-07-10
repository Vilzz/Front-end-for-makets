import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMaket, getImages, clearImages } from '../../actions/makets';
import { getCategories } from '../../actions/category';
import { getPackings } from '../../actions/packing';
import Navbar from '../dashboard/Navbar';
import PropTypes from 'prop-types';

const Addmaket = ({
  cloading,
  categories,
  createMaket,
  getImages,
  clearImages,
  getCategories,
  getPackings,
  imgloading,
  images,
  packings,
  packingLoading,
  history,
}) => {
  useEffect(() => {
    getImages();
    getCategories();
    getPackings();
  }, [getCategories, getImages, getPackings]);

  const [packingsData, setPackingsData] = useState([]);

  useEffect(() => {
    setPackingsData(
      !packingLoading && packings !== null
        ? packings.data.map((packing) => {
            return { id: packing._id, name: packing.name, selected: false };
          })
        : []
    );
  }, [packingLoading, packings]);

  const [ctgOptionsList, setCtgOptionsList] = useState([]);

  const [imgOptionsList, setImgOptionsList] = useState([]);

  const [currentCtg, setCurrentCtg] = useState({
    id: '0',
    name: 'Выбери категорию',
  });

  const [currentImg, setCurrentImg] = useState({
    id: '0',
    name: 'no-image.jpg',
  });

  useEffect(() => {
    setCtgOptionsList(
      !cloading && categories !== null
        ? categories.data.map((category) => {
            return { catid: category._id, catname: category.categoryname };
          })
        : []
    );
  }, [cloading, categories]);

  useEffect(() => {
    setImgOptionsList(
      !imgloading && images !== null
        ? images.data.map((image) => {
            return { id: image.id + 1, filename: image.filename };
          })
        : []
    );
  }, [imgloading, images]);

  const [maketData, setMaketdata] = useState({
    image: '',
    material: '',
    packing: [],
    maketname: '',
    shortdesc: '',
    category: '',
    description: '',
  });

  const onChange = (e) => {
    setMaketdata({
      ...maketData,
      [e.target.name]: e.target.value,
    });
  };
  const setNewCtg = (e) => {
    setCurrentCtg({
      id: e.target.value,
      name: e.target.options[e.target.options.selectedIndex].text,
    });
    setMaketdata({
      ...maketData,
      category: e.target.value,
    });
  };
  const imageChange = (e) => {
    setCurrentImg({
      id: e.target.value,
      name: e.target.options[e.target.options.selectedIndex].text,
    });
    setMaketdata({
      ...maketData,
      image: e.target.options[e.target.options.selectedIndex].text,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createMaket(maketData, history);
    clearImages();
  };

  const killWarning = () => null;

  const onMouseDown = (e) => {
    const inArray = maketData.packing.some((el) => el === e.target.value);
    if (e.ctrlKey) {
      !inArray
        ? setMaketdata({
            ...maketData,
            packing: [...maketData.packing, e.target.value],
          })
        : setMaketdata({
            ...maketData,
            packing: [
              ...maketData.packing.filter((item) => item !== e.target.value),
            ],
          });
    } else {
      setMaketdata({ ...maketData, packing: [e.target.value] });
    }
  };

  return (
    <div className='container component'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row'>
        <h2>
          <i className='fas fa-plus-square mr-3'></i>Добавить макет
        </h2>
        <hr />
      </div>
      <div className='row'>
        <div className='col-sm-3 editimageblock mt-3'>
          <img src={`/images/${currentImg.name}`} alt={maketData.maketname} />
          <Link
            to={`/admindashboard/addimage/1`}
            className='btn btn-sm btn-block btn-my-ocean mt-3'
          >
            Добавить изображение
          </Link>
        </div>
        <div className='col-sm-6'>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label htmlFor='name'>
                <small>Наименование:</small>
              </label>
              <input
                id='name'
                className='form-control form-control-sm'
                type='text'
                name='maketname'
                placeholder='Наименование макета'
                value={maketData.maketname}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='image'>
                <small>Изображение:</small>
              </label>
              <select
                id='image'
                className='form-control form-control-sm'
                type='text'
                name='image'
                value={currentImg.id}
                onChange={(e) => imageChange(e)}
              >
                <option value={currentImg.id}>{currentImg.name}</option>
                {imgOptionsList
                  .filter((file) => file.filename !== currentImg.name)
                  .map((file) => (
                    <option value={file.id} key={file.id}>
                      {file.filename}
                    </option>
                  ))}
              </select>
            </div>

            <div className='form-group'>
              <label htmlFor='category'>
                <small>Категория:</small>
              </label>
              <select
                id='category'
                className='form-control form-control-sm'
                type='text'
                name='category'
                value={currentCtg.id}
                onChange={(e) => setNewCtg(e)}
              >
                <option value={currentCtg.id}>{currentCtg.name}</option>

                {ctgOptionsList
                  .filter((ctg) => ctg.catid !== currentCtg.id)
                  .map((ctg) => (
                    <option value={ctg.catid} key={ctg.catid}>
                      {ctg.catname}
                    </option>
                  ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='material'>
                <small>Материал:</small>
              </label>
              <input
                id='material'
                className='form-control form-control-sm'
                type='text'
                name='material'
                placeholder='Основной материал макета'
                value={maketData.material}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='packing'>
                <small>
                  Упаковка: (для выбора нескольких значений удерживайти кнопку
                  CTRL)
                </small>
              </label>
              <select
                multiple={true}
                id='packing'
                className='form-control form-control-sm'
                type='text'
                name='packing'
                onChange={killWarning}
                onMouseDown={(e) => onMouseDown(e)}
                value={maketData.packing}
              >
                {packingsData.map((pack) => (
                  <Fragment key={pack.id}>
                    <option value={pack.id}>{pack.name}</option>
                  </Fragment>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='shortdesc'>
                <small>Краткое описание:</small>
              </label>
              <input
                id='shortdesc'
                className='form-control form-control-sm'
                type='text'
                name='shortdesc'
                placeholder='Краткое описание макета'
                value={maketData.shortdesc}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>
                <small>Описание:</small>
              </label>
              <textarea
                id='description'
                className='form-control form-control-sm'
                type='text'
                name='description'
                placeholder='Подробное описание макета'
                value={maketData.description}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input
              type='submit'
              className='btn btn-my-ocean mr-2'
              value='Создать'
            />
            <Link className='btn btn-my-ocean' to='/admindashboard/makets'>
              Вернуться к списку макетов
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

Addmaket.propTypes = {
  getImages: PropTypes.func.isRequired,
  clearImages: PropTypes.func.isRequired,
  createMaket: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getPackings: PropTypes.func.isRequired,
  cloading: PropTypes.bool.isRequired,
  categories: PropTypes.object,
  imgloading: PropTypes.bool.isRequired,
  images: PropTypes.object,
  packings: PropTypes.object,
  packingLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  cloading: state.categories.loading,
  categories: state.categories.categories,
  imgloading: state.makets.imgloading,
  images: state.makets.images,
  packings: state.packing.packings,
  packingLoading: state.packing.loading,
});

export default connect(mapStateToProps, {
  createMaket,
  getCategories,
  getImages,
  clearImages,
  getPackings,
})(Addmaket);
