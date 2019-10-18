import React from 'react';
import FlightSearchBar from '../../components/FlightSearchBar';
import FlightSearchCard from '../../components/FlightSearchCard';
import Section from '../../components/Section';

const SearchResultPage = () => {
  return (
    <Section>
      <div className="container">
        <FlightSearchBar />
        <br />
        <FlightSearchCard />
        <FlightSearchCard />
      </div>
    </Section>
  );
};

export default SearchResultPage;
