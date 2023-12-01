import { Product } from '../../types/Products';
import './Products.css';
import { Link } from 'react-router-dom';
import Rating from '../../components/Rating';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useGetProductsQuery } from '../../hooks/productHook';
import { getError } from '../../utils/error';
import { ApiError } from '../../types/ApiError';

const ProductsQuery = () => {
  const { t } = useTranslation();
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="productContainer">
      <Helmet>
        <title>{t('Products')}</title>
      </Helmet>
      {isLoading && <div className="productLoadingBox">{t('Loading')}</div>}
      {error && (
        <div className="productErrorBox">{getError(error as ApiError)}</div>
      )}
      {products?.map((product: Product, index: number) => (
        <div className="productBox" key={index}>
          <div>
            <img src={product.images} className="productBoxImage" />
          </div>
          <div className="productBoxTitle">
            <Link to={'/product/:' + product.slug}>{product.name}</Link>
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

export default ProductsQuery;
