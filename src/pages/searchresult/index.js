import React, { useState, useEffect } from 'react';
import FlightSearchBar from '../../components/FlightSearchBar';
import FlightSearchCard from '../../components/FlightSearchCard';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';

const SearchResultPage = props => {
  const [results, setResults] = useState([]);

  async function fetchData() {
    const { fromID, toID, date } = props.location.state;
    const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_FLIGHT_SEARCH_RESULT}?departureCityCode=${fromID}&arrivalCityCode=${toID}&date=${formattedDate}`,
    );
    res
      .json()
      .then(r => {
        const result = r.data.map(e => {
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
        setResults(result);
      })
      .catch(e => console.log(e));
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
          airline={r.airline}
          departureTime={r.departureTime}
          departureAirportCode={r.departureAirportCode}
          arrivalTime={r.arrivalTime}
          arrivalAirportCode={r.arrivalAirportCode}
          price={r.price}
        />
      );
    });

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
        <div>{generateFlightSearchResults()}</div>
      </div>
    </Section>
  );
};

export default SearchResultPage;
