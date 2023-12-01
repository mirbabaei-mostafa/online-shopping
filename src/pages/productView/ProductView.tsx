import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useGetProductWithSlugQuery } from '../../hooks/productHook';
import { getError } from '../../utils/error';
import { ApiError } from '../../types/ApiError';
import Rating from '../../components/Rating';
import './Product.css';

const ProductView = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const { data: product, isLoading, error } = useGetProductWithSlugQuery(slug!);
  return (
    <div className="productContainer">
      <Helmet>
        <title>{product?.id ? product.name : t('ProductNotFound')}</title>
      </Helmet>
      {isLoading && <div className="productLoadingBox">{t('Loading')}</div>}
      {error && (
        <div className="productErrorBox">{getError(error as ApiError)}</div>
      )}
      {product?.id && (
        <div className="productBox">
          <div className="productImageBox">
            <img src={product.images} className="productImage" />
          </div>
          <div className="productInfoBox">
            <div className="productBoxTitle">{product.name}</div>
            <div className="productBoxRaiting">
              <span className="productBoxRaitingText">{product.rating}</span>
              <Rating rate={product.rating} />{' '}
              <span className="productBoxRaitingText">
                {product.review} {t('Reviews')}
              </span>
            </div>
            <div className="productBoxPrice">
              {t('Price')}{' '}
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}
              <span className="productBoxPriceSign">€</span>
              <div className="productBoxDiscount">
                {t('InsteadOf')}:{' '}
                <span className="productBoxDiscountOver">{product.price}</span>{' '}
                ({product.discount} % {t('Discount')})
              </div>
              <div>
                {product.count > 0 ? (
                  <button className="productBoxAddToCard">
                    {t('AddToCart')}
                  </button>
                ) : (
                  <div className="productBoxOutOfBox">{t('OutOfBox')}</div>
                )}
              </div>
            </div>
            <div className="productBoxDescription">{product.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductView;
