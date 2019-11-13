import React from 'react';
import FlightSearchBar from '../FlightSearchBar';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import './styles.scss';
import HotelSearchBar from '../HotelSearchBar';
import { PRODUCT_TYPE } from '../../data/constants';
import PackageSearchBar from '../PackageSearchBar';

const HeroSection = props => {
  const searchBar = () => {
    const { productType } = props;
    switch (productType) {
      case PRODUCT_TYPE.HOTELS:
        return <HotelSearchBar isInverted />;
      case PRODUCT_TYPE.PACKAGES:
        return <PackageSearchBar isInverted />;
      default:
        return <FlightSearchBar isInverted />;
    }
  };

  return (
    <Section
      color={props.color}
      size={props.size}
      backgroundImage={props.backgroundImage}
      backgroundImageOpacity="0.5"
    >
      <div className="container">
        <SectionHeader title={props.title} subtitle={props.subtitle} centered size={1} />
        {searchBar()}
      </div>
    </Section>
  );
};

export default HeroSection;
