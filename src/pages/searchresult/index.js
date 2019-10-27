import React, { useState, useEffect } from 'react';
import FlightSearchBar from '../../components/FlightSearchBar';
import FlightSearchCard from '../../components/FlightSearchCard';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import errorImage from '../../assets/images/error.png';

const SearchResultPage = props => {
  const [results, setResults] = useState([]);
  const [dateQuery, setDateQuery] = useState('');

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
        {results === undefined || results.length === 0 ? (
          <div className="columns is-mobile is-centered">
            <div className="column is-narrow">
              <figure className="image container is-96x96">
                <img src={errorImage} alt="errorImage" />
              </figure>
              <div>
                <p className="has-text-centered">
                  Sorry, there was a problem in our system. Please try again later.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>{generateFlightSearchResults()}</div>
        )}
      </div>
    </Section>
  );
};

export default SearchResultPage;
