import React, { useState, useEffect } from 'react';
import FlightSearchBar from '../../components/FlightSearchBar';
import FlightSearchCard from '../../components/FlightSearchCard';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import AlternateSection from '../../components/AlternateSection';

const SearchResultPage = props => {
  const [results, setResults] = useState([]);
  const [dateQuery, setDateQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData() {
    const { fromID, toID, date } = props.location.state;
    setDateQuery(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_FLIGHT_SEARCH_RESULT}?departureCityCode=${fromID}&arrivalCityCode=${toID}&date=${dateQuery}`,
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
  }, []);

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
          fromID={props.location.state.fromID}
          toID={props.location.state.toID}
          date={props.location.state.date}
        />
        <br />
        {showResult()}
      </div>
    </Section>
  );
};

export default SearchResultPage;
