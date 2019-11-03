import React, { useState, useEffect } from 'react';
import FlightSearchBar from '../../components/FlightSearchBar';
import FlightSearchCard from '../../components/FlightSearchCard';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import { BACKEND_URL, ENDPOINT, PRODUCT_TYPE } from '../../data/constants';
import AlternateSection from '../../components/AlternateSection';
import FlightSearchResult from '../../components/FlightSearchResult';
import HotelSearchResult from '../../components/HotelSearchResult';

const SearchResultPage = props => {
  const searchResult = () => {
    const { type, query } = props.location.state;
    switch (type) {
      case PRODUCT_TYPE.FLIGHTS:
        return <FlightSearchResult query={query} />;
      case PRODUCT_TYPE.HOTELS:
        return <HotelSearchResult query={query} />;
      default:
        return <FlightSearchResult query={query} />;
    }
  };
  return searchResult();
};

export default SearchResultPage;
