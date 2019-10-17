import React from 'react';
import FlightSearchBar from '../../components/FlightSearchBar';
import Section from '../../components/Section';

const SearchResultPage = () => {
  return (
    <Section>
      <div className="container">
        <FlightSearchBar />
      </div>
    </Section>
  );
};

export default SearchResultPage;
