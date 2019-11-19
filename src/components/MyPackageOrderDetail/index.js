import React from 'react';
import Divider from '../Divider';
import { formatHourMinute, timeDiff } from '../../util/display';

const MyPackageOrderDetail = props => {
  const {
    orderId,
    titleFirstPassenger,
    titleSecondPassenger,
    nameFirstPassenger,
    nameSecondPassenger,
    date,
  } = props.data;

  return (
    <div>
      <div className="has-text-weight-bold">{`Order ID ${orderId}`}</div>
      <br />
      <div>{`${titleFirstPassenger} ${nameFirstPassenger}`}</div>
      <div>{`${titleSecondPassenger} ${nameSecondPassenger}`}</div>
      <br />
      <Divider color="light" />
      <br />
      <br />
      <div className="has-text-weight-bold">{date}</div>
    </div>
  );
};

export default MyPackageOrderDetail;
