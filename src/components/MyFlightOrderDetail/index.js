import React from 'react';
import Divider from "../Divider";

const MyFlightOrderDetail = () => {
  return (
    <div>
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
  );
};

export default MyFlightOrderDetail;
