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
  } = props.data.orderData;

  const { name, city, startDate, rate, duration_days, description } = props.data.package;

  console.log(props);

  return (
    <div>
      <div className="has-text-weight-bold">{`Order ID ${orderId}`}</div>
      <br />
      <div>{`${titleFirstPassenger} ${nameFirstPassenger}`}</div>
      <div>{`${titleSecondPassenger} ${nameSecondPassenger}`}</div>
      <br />
      <Divider color="light" />
      <br />
      <div className="has-text-weight-bold">{name}</div>
      <div>{city}</div>
      <div>{startDate}</div>
      <div>{description}</div>
    </div>
  );
};

export default MyPackageOrderDetail;
