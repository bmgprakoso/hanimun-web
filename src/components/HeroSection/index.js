import React from 'react';
import FlightSearchBar from '../FlightSearchBar';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import './styles.scss';
import HotelSearchBar from '../HotelSearchBar';

function HeroSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader title={props.title} subtitle={props.subtitle} centered size={1} />
        <HotelSearchBar isInverted />
        {/* <FlightSearchBar isInverted /> */}
      </div>
    </Section>
  );
}

export default HeroSection;
