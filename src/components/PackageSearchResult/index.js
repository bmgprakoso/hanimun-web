import React, { useState, useEffect } from 'react';
import { BACKEND_URL, ENDPOINT } from '../../data/constants';
import PackageSearchBar from '../PackageSearchBar';
import PackageSearchCard from '../PackageSearchCard';
import AlternateSection from '../AlternateSection';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { formatDateWithStripe } from '../../util/display';
import './styles.scss';

const PackageSearchResult = props => {
  const { query } = props;
  const { fromCityCode, toCityCode, date } = query;

  const [results, setResults] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  async function fetchData() {
    setIsError(false);
    setIsEmpty(false);
    const res = await fetch(
      `${BACKEND_URL}${
        ENDPOINT.GET_PACKAGE_SEARCH_RESULT
      }?fromCityCode=${fromCityCode}&toCityCode=${toCityCode}&startDate=${formatDateWithStripe(
        date,
      )}`,
    );
    res
      .json()
      .then(r => {
        const resultsData = r.data.map(e => {
          return {
            city: e.city,
            durationDays: e.durationDays,
            durationNights: e.durationNights,
            description: e.description,
            id: e.id,
            name: e.name,
            price: e.price,
            rate: e.rate,
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

  const generatePackageSearchResults = () =>
    results.map(r => (
      <div className="column is-4-desktop is-12-mobile">
        <PackageSearchCard
          city={r.city}
          durationDays={r.durationDays}
          durationNights={r.durationNights}
          description={r.description}
          id={r.id}
          name={r.name}
          price={r.price}
          rate={r.rate}
          date={formatDateWithStripe(date)}
        />
      </div>
    ));

  const showResult = () => {
    if (isError) {
      return <AlternateSection error />;
    }

    if (isEmpty) {
      return <AlternateSection empty />;
    }

    return <div className="columns is-multiline is-mobile">{generatePackageSearchResults()}</div>;
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Search Result" size={2} />
        <PackageSearchBar fromCityCode={fromCityCode} toCityCode={toCityCode} date={date} />
        <br />
        {showResult()}
      </div>
    </Section>
  );
};

export default PackageSearchResult;
