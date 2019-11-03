import React from 'react';
import { formatPrice } from '../../util/display';

const PriceTable = props => {
  const { label, price } = props;

  return (
    <table className="table is-fullwidth">
      <tbody>
        <tr>
          <td>{label}</td>
          <td align="right">{formatPrice(price)}</td>
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
            {formatPrice(price)}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PriceTable;
