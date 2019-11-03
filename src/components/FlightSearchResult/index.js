import React, { useState, useEffect } from 'react';
import FlightSearchBar from '../FlightSearchBar';
import FlightSearchCard from '../FlightSearchCard';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../AlternateSection';
import { formatDateWithStripe } from '../../util/display';

const FlightSearchResult = props => {
  const [results, setResults] = useState([]);
  const [dateQuery, setDateQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData() {
    const { fromID, toID, date } = props.query;
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
            id: e.flightCode,
            airline: e.airline,
            departureTime: e.departureTime,
            departureAirportCode: e.departureAirportCode,
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
  }, [props.query]);

  const generateFlightSearchResults = () =>
    results.map(r => {
      return (
        <FlightSearchCard
          key={r.id}
          flightId={r.id}
          date={dateQuery}
          airline={r.airline}
          departureTime={r.departureTime}
          departureAirportCode={r.departureAirportCode}
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
        <FlightSearchBar
          fromID={props.query.fromID}
          toID={props.query.toID}
          date={props.query.date}
        />
        <br />
        {showResult()}
      </div>
    </Section>
  );
};

export default FlightSearchResult;
