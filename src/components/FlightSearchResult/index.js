import React, { useState, useEffect } from 'react';
import FlightSearchBar from '../FlightSearchBar';
import FlightSearchCard from '../FlightSearchCard';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../AlternateSection';
import { formatDateWithStripe } from '../../util/display';

const FlightSearchResult = props => {
  const { query } = props;
  const { fromID, toID, date } = query;

  const [results, setResults] = useState([]);
  const [dateQuery, setDateQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData() {
    setDateQuery(formatDateWithStripe(date));
    setIsError(false);
    setIsEmpty(false);
    const res = await fetch(
      `${BACKEND_URL}${
        ENDPOINT.GET_FLIGHT_SEARCH_RESULT
      }?departureCityCode=${fromID}&arrivalCityCode=${toID}&date=${formatDateWithStripe(date)}`,
    );
    res
      .json()
      .then(r => {
        const resultsData = r.data.map(e => {
          return {
            id: e.flightId,
            airline: e.airline,
            departureTime: e.departureTime,
            departureAirportCode: e.departureAirportCode,
            departureCity: e.departureCity,
            arrivalCity: e.arrivalCity,
            arrivalTime: e.arrivalTime,
            arrivalAirportCode: e.arrivalAirportCode,
            price: e.price,
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
  }, [query]);

  const generateFlightSearchResults = () =>
    results.map(r => {
      return (
        <FlightSearchCard
          key={r.id}
          flightId={r.id}
          date={dateQuery}
          airline={r.airline}
          departureCity={r.departureCity}
          departureTime={r.departureTime}
          departureAirportCode={r.departureAirportCode}
          arrivalCity={r.arrivalCity}
          arrivalTime={r.arrivalTime}
          arrivalAirportCode={r.arrivalAirportCode}
          price={r.price}
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

    return <div>{generateFlightSearchResults()}</div>;
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Search Result" size={2} />
        <FlightSearchBar fromID={fromID} toID={toID} date={date} />
        <br />
        {showResult()}
      </div>
    </Section>
  );
};

export default FlightSearchResult;
