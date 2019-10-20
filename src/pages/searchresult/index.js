import React from 'react';
import FlightSearchBar from '../../components/FlightSearchBar';
import FlightSearchCard from '../../components/FlightSearchCard';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';

const SearchResultPage = () => {
  return (
    <Section>
      <div className="container">
        <SectionHeader title="Search Result" size={2} />
        <FlightSearchBar />
        <br />
        <FlightSearchCard />
        <FlightSearchCard />
      </div>
    </Section>
  );
};

export default SearchResultPage;
