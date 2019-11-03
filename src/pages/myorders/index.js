/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import MyOrderCard from '../../components/MyOrderCard';
import FlightHistory from '../../components/FlightHistory';

const FLIGHT = 'FLIGHT';
const HOTEL = 'HOTEL';
const PACKAGE = 'PACKAGE';

const MyOrdersPage = () => {
  const [activeTab, setActiveTab] = useState(FLIGHT);

  return (
    <Section>
      <div className="container">
        <SectionHeader title="My Orders" size={2} />
        <div className="tabs is-centered">
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
      </div>
    </Section>
  );
};

export default MyOrdersPage;
