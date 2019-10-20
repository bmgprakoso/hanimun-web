import React, { useEffect } from 'react';
import FlightSearchBar from '../../components/FlightSearchBar';
import FlightSearchCard from '../../components/FlightSearchCard';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';

const SearchResultPage = () => {
  async function fetchData() {
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_FLIGHT_SEARCH_RESULT}?departureCityCode=&arrivalCityCode=PDG&arrivalTimeMin=20:00:00`,
    );
    res
      .json()
      .then(r => console.log(r))
      .catch(e => console.log(e));
  }

  useEffect(() => {
    fetchData();
  });

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
