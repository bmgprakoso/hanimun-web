/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useRouter } from '../../util/router';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import AlternateSection from '../../components/AlternateSection';
import { BACKEND_URL, ENDPOINT, PRODUCT_TYPE } from '../../data/constants';
import { formatPrice } from '../../util/display';

const ITINERARY = 'Itinerary';
const INCLUSIONS = 'Inclusions';
const EXCLUSIONS = 'Exclusions';
const TNC = 'Terms and Conditions';

const PackageDetailPage = props => {
  const { id, date } = props.location.state;

  const router = useRouter();

  const [packageInfo, setPackageInfo] = useState({});
  const [activeTab, setActiveTab] = useState(ITINERARY);
  const [flightInfo, setFlightInfo] = useState({});
  const [flightInfoReturn, setFlightInfoReturn] = useState({});
  const [hotelInfo, setHotelInfo] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function fetchData() {
    setIsError(false);
    setIsLoading(true);
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_PACKAGE_DETAIL}?id=${id}&startDate=${date}`,
    );
    res
      .json()
      .then(r => {
        const {
          package: packageData,
          flightDetail: flightData,
          flightDetaiReturn: flightDataReturn,
          hotelDetail: hotelData,
        } = r.data;
        setPackageInfo({
          city: packageData.city,
          description: packageData.description,
          durationDays: packageData.duration_days,
          durationNights: packageData.duration_nights,
          packageId: packageData.id,
          name: packageData.name,
          price: packageData.price,
          rate: packageData.rate,
          startDate: packageData.startDate,
        });
        setFlightInfo({
          airline: flightData.airline,
          departureCity: flightData.departureCity,
          departureTime: flightData.departureTime,
          departureAirportCode: flightData.departureAirportCode,
          arrivalCity: flightData.arrivalCity,
          arrivalTime: flightData.arrivalTime,
          arrivalAirportCode: flightData.arrivalAirportCode,
          price: flightData.price,
          startDate: flightData.startDate,
        });
        setFlightInfoReturn({
          airline: flightDataReturn.airline,
          departureCity: flightDataReturn.departureCity,
          departureTime: flightDataReturn.departureTime,
          departureAirportCode: flightDataReturn.departureAirportCode,
          arrivalCity: flightDataReturn.arrivalCity,
          arrivalTime: flightDataReturn.arrivalTime,
          arrivalAirportCode: flightDataReturn.arrivalAirportCode,
          price: flightDataReturn.price,
          startDate: flightDataReturn.startDate,
        });
        setHotelInfo({
          address: hotelData.address,
          city: hotelData.city,
          hotelName: hotelData.hotelName,
          price: hotelData.price,
          rate: hotelData.rate,
          roomType: hotelData.roomType,
          startDate: packageData.startDate,
          endDate: packageData.startDate,
        });
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const select = () => {
    router.push({
      pathname: '/orderdetail',
      state: {
        type: PRODUCT_TYPE.PACKAGES,
        info: { packageInfo, flightInfo, flightInfoReturn, hotelInfo },
      },
    });
  };

  const packageStar = () => {
    const stars = [...Array(parseInt(packageInfo.rate, 10))].map(() => (
      <i className="fas fa-star has-text-warning" />
    ));
    return <div>{stars}</div>;
  };

  const packageSummaryView = () => {
    const { city, description, durationDays, durationNights, name, price, startDate } = packageInfo;
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src={`https://ui-avatars.com/api/?name=${name.split(' ').join('+')}`}
                  alt="Package avatar"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{name}</p>
              <p className="subtitle is-6">{`${city} | ${startDate} | 2 Tamu, 1 Kamar`}</p>
            </div>
          </div>
        </div>
        <div className="card-image">
          <figure className="image is-3by1">
            <img src="https://source.unsplash.com/720x240/?travel,nature" alt="package" />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <div className="columns">
              <div className="column">
                <div className="has-text-weight-bold">{`${durationDays} day(s), ${durationNights} night(s)`}</div>
                <div>{description}</div>
                <div>{packageStar()}</div>
              </div>
              <div className="column is-narrow">
                <div className="is-size-4 has-text-weight-bold">{formatPrice(price)}</div>
                <button
                  type="submit"
                  className="button is-info FlightSearchCard__select-button"
                  onClick={select}
                >
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                  <span>Select</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const itineraryView = () => (
    <div>
      <p>itinerary</p>
    </div>
  );
  const inclusionsView = () => {
    return <p>inclusions</p>;
  };
  const exclusionsView = () => (
    <div>
      <p>exclusions</p>
    </div>
  );
  const tncView = () => (
    <div>
      <p>tnc</p>
    </div>
  );

  const detailTabView = () => {
    return (
      <div className="card">
        <div className="card-content">
          <div className="tabs is-boxed">
            <ul>
              <li className={activeTab === ITINERARY && 'is-active'}>
                <a onClick={() => setActiveTab(ITINERARY)}>
                  <span className="icon is-small">
                    <i className="far fa-flag" />
                  </span>
                  <span>{ITINERARY}</span>
                </a>
              </li>
              <li className={activeTab === INCLUSIONS && 'is-active'}>
                <a onClick={() => setActiveTab(INCLUSIONS)}>
                  <span className="icon is-small">
                    <i className="fas fa-sign-in-alt" />
                  </span>
                  <span>{INCLUSIONS}</span>
                </a>
              </li>
              <li className={activeTab === EXCLUSIONS && 'is-active'}>
                <a onClick={() => setActiveTab(EXCLUSIONS)}>
                  <span className="icon is-small">
                    <i className="fas fa-sign-out-alt" />
                  </span>
                  <span>{EXCLUSIONS}</span>
                </a>
              </li>
              <li className={activeTab === TNC && 'is-active'}>
                <a onClick={() => setActiveTab(TNC)}>
                  <span className="icon is-small">
                    <i className="fas fa-tasks" />
                  </span>
                  <span>{TNC}</span>
                </a>
              </li>
            </ul>
          </div>

          {activeTab === ITINERARY && itineraryView()}
          {activeTab === INCLUSIONS && inclusionsView()}
          {activeTab === EXCLUSIONS && exclusionsView()}
          {activeTab === TNC && tncView()}
        </div>
      </div>
    );
  };

  const showContent = () => {
    if (isError) {
      return <AlternateSection error />;
    }

    if (isLoading) {
      return <AlternateSection loading />;
    }

    return (
      <div>
        {packageSummaryView()}
        {detailTabView()}
      </div>
    );
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Package Detail" size={2} />
        {showContent()}
      </div>
    </Section>
  );
};

export default PackageDetailPage;
