import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Product = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t('Product')}</title>
      </Helmet>
      Product
    </div>
  );
};

export default Product;
