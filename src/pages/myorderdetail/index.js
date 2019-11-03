import React from 'react';
import SectionHeader from '../../components/SectionHeader';
import Section from '../../components/Section';
import Divider from '../../components/Divider';
import PriceTable from '../../components/PriceTable';
import MyFlightOrderDetail from '../../components/MyFlightOrderDetail';

const MyOrderDetailPage = () => {
  return (
    <Section>
      <div className="container">
        <SectionHeader title="My Order Detail" size={2} />
        <div className="box">
          <div className="columns">
            <div className="column">
              <MyFlightOrderDetail />
            </div>
            <div className="column">
              <PriceTable price="10000" label="Adult (x2)" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MyOrderDetailPage;
