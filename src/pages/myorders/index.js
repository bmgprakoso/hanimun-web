/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useAuth } from '../../util/auth';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import MyOrderCard from '../../components/MyOrderCard';
import FlightHistory from '../../components/FlightHistory';
import HotelHistory from '../../components/HotelHistory';
import AlternateSection from '../../components/AlternateSection';

const FLIGHT = 'FLIGHT';
const HOTEL = 'HOTEL';
const PACKAGE = 'PACKAGE';

const MyOrdersPage = () => {
  const auth = useAuth();

  const [activeTab, setActiveTab] = useState(FLIGHT);

  if (!auth.user) {
    return <AlternateSection pageNotFound />;
  }

  return (
    <Section>
      <div className="container">
        <SectionHeader title="My Orders" size={2} />
        <div className="tabs is-boxed">
          <ul>
            <li className={activeTab === FLIGHT && 'is-active'}>
              <a onClick={() => setActiveTab(FLIGHT)}>
                <span className="icon is-small">
                  <i className="fas fa-plane" />
                </span>
                <span>Flight</span>
              </a>
            </li>
            <li className={activeTab === HOTEL && 'is-active'}>
              <a onClick={() => setActiveTab(HOTEL)}>
                <span className="icon is-small">
                  <i className="fas fa-hotel" />
                </span>
                <span>Hotel</span>
              </a>
            </li>
            <li className={activeTab === PACKAGE && 'is-active'}>
              <a onClick={() => setActiveTab(PACKAGE)}>
                <span className="icon is-small">
                  <i className="fas fa-user-friends" />
                </span>
                <span>Package</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Tab content */}

        {activeTab === FLIGHT && <FlightHistory />}
        {activeTab === HOTEL && <HotelHistory />}
      </div>
    </Section>
  );
};

export default MyOrdersPage;
