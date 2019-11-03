import React, { useState, useEffect } from 'react';
import HotelSearchBar from '../HotelSearchBar';
import HotelSearchCard from '../HotelSearchCard';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../AlternateSection';

const HotelSearchResult = props => {
  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData() {
    const { cityCode, startDate, endDate } = props.query;
    setIsError(false);
    setIsEmpty(false);
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_HOTEL_SEARCH_RESULT}?cityCode=${cityCode}`,
    );
    res
      .json()
      .then(r => {
        const resultsData = r.data.map(e => {
          return {
            id: e.roomId,
            address: e.address,
            city: e.city,
            hotelName: e.hotelName,
            price: e.price,
            rate: e.rate,
            roomType: e.roomType,
            startDate,
            endDate,
          };
        });
        setResults(resultsData);
        if (resultsData.length === 0) {
          setIsEmpty(true);
        }
      })
      .catch(() => setIsError(true));
  }

  useEffect(() => {
    fetchData();
  }, [props.query]);

  const generateHotelSearchResults = () =>
    results.map(r => {
      return (
        <HotelSearchCard
          key={r.id}
          address={r.address}
          city={r.city}
          hotelName={r.hotelName}
          rate={r.rate}
          roomType={r.roomType}
          price={r.price}
          startDate={r.startDate}
          endDate={r.endDate}
        />
      );
    });

  const showResult = () => {
    if (isError) {
      return <AlternateSection error />;
    }

    if (isEmpty) {
      return <AlternateSection empty />;
    }

    return <div>{generateHotelSearchResults()}</div>;
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Search Result" size={2} />
        <HotelSearchBar
          cityCode={props.query.cityCode}
          startDate={props.query.startDate}
          endDate={props.query.endDate}
        />
        <br />
        {showResult()}
      </div>
    </Section>
  );
};

export default HotelSearchResult;
