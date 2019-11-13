import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/HeroSection';
import './styles.scss';
import { PRODUCT_TYPE } from '../../data/constants';

const HomePage = props => {
  const [subtitle, setSubtitle] = useState('');
  const [productType, setProductType] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const productPath = props.location.pathname.substr(1);
    switch (productPath) {
      case PRODUCT_TYPE.HOTELS:
        setSubtitle('Find the best deals from all the major hotel services.');
        setBackgroundImage(
          'https://images.unsplash.com/flagged/photo-1570209432247-1bb8b87a7bda?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920',
        );
        break;
      case PRODUCT_TYPE.PACKAGES:
        setSubtitle('Search and compare vacation packages.');
        setBackgroundImage(
          'https://images.unsplash.com/photo-1517842264405-72bb906a1936?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920',
        );
        break;
      default:
        setSubtitle('Find and compare cheap flights.');
        setBackgroundImage(
          'https://images.unsplash.com/photo-1567149030214-022a0e0f4d91?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1920',
        );
        break;
    }
    setProductType(productPath);
  }, [props.location.pathname]);

  return (
    <HeroSection
      color="dark"
      size="large"
      title="Honeymoon? Hanimun aja."
      subtitle={subtitle}
      backgroundImage={backgroundImage}
      productType={productType}
    />
  );
};

export default HomePage;
