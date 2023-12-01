import React, { useEffect, useReducer, useState } from 'react';
// import { sampleProducts } from '../../data/sampleProducts';
import { Product } from '../../types/Products';
import { productService } from '../../services/api-products';
import './Products.css';
import { Link } from 'react-router-dom';
import Rating from '../../components/Rating';
import { useTranslation } from 'react-i18next';
import axios, { CanceledError } from 'axios';
import { getError } from '../../utils/error';
import { ApiError } from '../../types/ApiError';
import { Helmet } from 'react-helmet-async';

type State = {
  products: Product[];
  loading: boolean;
  error: string;
};

type Actions =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_FAIL'; payload: string };

const initialState: State = {
  products: [],
  loading: true,
  error: '',
};

const reducers = (state: State, actions: Actions) => {
  switch (actions.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: actions.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: actions.payload };
    default:
      return state;
  }
};

const Products = () => {
  const { t } = useTranslation();
  // const [products, setProducts] = useState<Product[]>([]);
  // const [isLoading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>();
  const [{ products, loading, error }, dispatch] = useReducer(
    reducers,
    initialState
  );

  // useEffect(() => {
  //   setLoading(true);
  //   const { request, cancel } = productService.getAll<Product>();
  //   request
  //     .then((res) => {
  //       setProducts(res.data);
  //       console.log(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setLoading(false);
  //       setError(err.message);
  //     });
  //   return () => cancel();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await axios.get('http://localhost:4004/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="productContainer">
      <Helmet>
        <title>{t('Products')}</title>
      </Helmet>
      {loading && <div className="productLoadingBox">{t('Loading')}</div>}
      {error && <div className="productErrorBox">{error}</div>}
      {products.map((product: Product, index: number) => (
        <div className="productBox" key={index}>
          <div>
            <img src={product.images} className="productBoxImage" />
          </div>
          <div className="productBoxTitle">
            <Link to={'/product/' + product.slug}>{product.name}</Link>
          </div>
          <div className="productBoxRaiting">
            <Rating rate={product.rating} />{' '}
            <span className="productBoxRaitingText">{product.review}</span>
          </div>
          <div className="productBoxPrice">
            {(product.price - (product.price * product.discount) / 100).toFixed(
              2
            )}
            <span className="productBoxPriceSign">€</span>
          </div>
          <div className="productBoxDiscount">
            {t('InsteadOf')}:{' '}
            <span className="productBoxDiscountOver">{product.price}</span> (
            {product.discount} % {t('Discount')})
          </div>
          <div>
            {product.count > 0 ? (
              <button className="productBoxAddToCard">{t('AddToCart')}</button>
            ) : (
              <div className="productBoxOutOfBox">{t('OutOfBox')}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
