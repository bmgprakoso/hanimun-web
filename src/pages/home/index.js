import React from 'react';
import HeroSection from '../../components/HeroSection';
import './styles.scss';

function HomePage() {
  return (
    <HeroSection
      color="primary"
      size="large"
      title="Lorem ipsum dolor sit amet"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper ultricies nisi sed maximus."
      buttonText="Start Free Trial"
    />
  );
}

export default HomePage;
