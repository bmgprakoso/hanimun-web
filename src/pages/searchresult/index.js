import React from 'react';
import { PRODUCT_TYPE } from '../../data/constants';
import FlightSearchResult from '../../components/FlightSearchResult';
import HotelSearchResult from '../../components/HotelSearchResult';
import PackageSearchResult from '../../components/PackageSearchResult';

const SearchResultPage = props => {
  const searchResult = () => {
    const { type, query } = props.location.state;
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
