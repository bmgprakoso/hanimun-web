import React from 'react';
import { PRODUCT_TYPE } from '../../data/constants';
import FlightSearchResult from '../../components/FlightSearchResult';
import HotelSearchResult from '../../components/HotelSearchResult';
import PackageSearchResult from '../../components/PackageSearchResult';
import AlternateSection from '../../components/AlternateSection';

const SearchResultPage = props => {
  const { state } = props.location;
  if (!state) {
    return <AlternateSection pageNotFound />;
  }

  const { type, query } = state;

  const searchResult = () => {
    switch (type) {
      case PRODUCT_TYPE.FLIGHTS:
        return <FlightSearchResult query={query} />;
      case PRODUCT_TYPE.HOTELS:
        return <HotelSearchResult query={query} />;
      case PRODUCT_TYPE.PACKAGES:
        return <PackageSearchResult query={query} />;
      default:
        return <FlightSearchResult query={query} />;
    }
  };
  return searchResult();
};

export default SearchResultPage;
