import React from 'react';
import SectionHeader from '../../components/SectionHeader';
import Section from '../../components/Section';
import Divider from '../../components/Divider';

const MyOrderDetailPage = () => {
  return (
    <Section>
      <div className="container">
        <SectionHeader title="My Order Detail" size={2} />
        <div className="box">
          <div className="columns">
            <div className="column">
              <div className="has-text-weight-bold">Order ID 12345</div>
              <br />
              <div>Full Name Passenger 1</div>
              <div>Full Name Passenger 2</div>
              <br />
              <Divider color="light" />
              <br />
              <div className="has-text-weight-bold">Jakarta (HLP) &#x2192; Surabaya (SUB)</div>
              <div>United Airlines</div>
              <br />
              <div className="has-text-weight-bold">Saturday, 19 October 2019</div>
              <div className="columns is-vcentered">
                <div className="column">
                  <div>09.10</div>
                  <div>HLP</div>
                </div>
                <div className="column">
                  <div>1h 30m</div>
                  <div>Direct</div>
                </div>
                <div className="column">
                  <div>10.40</div>
                  <div>SUB</div>
                </div>
              </div>
            </div>
            <div className="column">
              <table className="table is-fullwidth">
                <tbody>
                  <tr>
                    <td>Adult (x2)</td>
                    <td align="right">320,000 IDR</td>
                  </tr>
                  <tr>
                    <td>Tax</td>
                    <td align="right">0 IDR</td>
                  </tr>
                  <tr>
                    <td>Service Charge</td>
                    <td align="right">0 IDR</td>
                  </tr>
                  <tr>
                    <td className="has-text-weight-bold">Total Payment</td>
                    <td align="right" className="has-text-weight-bold">
                      320,000 IDR
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MyOrderDetailPage;
