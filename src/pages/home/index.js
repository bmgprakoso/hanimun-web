import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/HeroSection';
import './styles.scss';
import { PRODUCT_TYPE } from '../../data/constants';

const HomePage = props => {
  const [subtitle, setSubtitle] = useState('');
  const [productType, setProductType] = useState('');

  useEffect(() => {
    const productPath = props.location.pathname.substr(1);
    switch (productPath) {
      case PRODUCT_TYPE.HOTELS:
        setSubtitle('Find the best deals from all the major hotel services.');
        break;
      case PRODUCT_TYPE.PACKAGES:
        setSubtitle('Search and compare vacation packages.');
        break;
      default:
        setSubtitle('Find and compare cheap flights.');
        break;
    }
    setProductType(productPath);
  }, [props.location.pathname]);

  return (
    <HeroSection
      color="primary"
      size="large"
      title="Honeymoon? Hanimun aja."
      subtitle={subtitle}
      productType={productType}
    />
  );
};

export default HomePage;
