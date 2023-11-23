import React from 'react';
import { sampleProducts } from '../../data/sampleProducts';
import { Product } from '../../types/Products';
import './Products.css';
import { Link } from 'react-router-dom';
import Rating from '../../components/Rating';
import { useTranslation } from 'react-i18next';

const Products = () => {
  const { t } = useTranslation();
  return (
    <div className="productContainer">
      {sampleProducts.map((product: Product, index: number) => (
        <div className="productBox" key={index}>
          <div>
            <img src={product.images} className="productBoxImage" />
          </div>
          <div className="productBoxTitle">
            <Link to={'/product/' + product.id}>{product.name}</Link>
          </div>
          <div className="productBoxRaiting">
            <Rating rate={product.rating} />{' '}
            <span className="productBoxRaitingText">{product.review}</span>
          </div>
          <div className="productBoxPrice">
            {((product.price * product.discount) / 100).toFixed(2)}
            <span className="productBoxPriceSign">€</span>
          </div>
          <div className="productBoxDiscount">
            {t('InsteadOf')}:{' '}
            <span className="productBoxDiscountOver">{product.price}</span> (
            {product.discount} % {t('Discount')})
          </div>
          <div>
            <button className="productBoxAddToCard">{t('AddToCart')}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
