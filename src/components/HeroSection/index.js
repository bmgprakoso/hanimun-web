import React from 'react';
import FlightSearchBar from "../FlightSearchBar";
import Section from "../Section";
import SectionHeader from "../SectionHeader";
import './styles.scss';

function HeroSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader title={props.title} subtitle={props.subtitle} centered size={1} />
        <FlightSearchBar isInverted />
      </div>
    </Section>
  );
}

export default HeroSection;
