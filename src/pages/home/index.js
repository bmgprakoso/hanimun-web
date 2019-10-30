import React from 'react';
import HeroSection from '../../components/HeroSection';
import './styles.scss';

function HomePage() {
  return (
    <HeroSection
      color="primary"
      size="large"
      title="Honeymoon? Hanimun aja."
      subtitle="Find and compare cheap flights."
    />
  );
}

export default HomePage;
