import React, { useState, useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader';
import Section from '../../components/Section';
import PriceTable from '../../components/PriceTable';
import MyFlightOrderDetail from '../../components/MyFlightOrderDetail';
import { BACKEND_URL, ENDPOINT, PRODUCT_TYPE } from '../../data/constants';
import AlternateSection from '../../components/AlternateSection';
import MyHotelOrderDetail from '../../components/MyHotelOrderDetail';

const MyOrderDetailPage = props => {
  const [productData, setProductData] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const { orderId, orderType } = props.location.state;
    const res = await fetch(
      `${BACKEND_URL}${ENDPOINT.GET_ORDER_DETAIL}?orderId=${orderId}&orderType=${orderType}`,
    );
    res
      .json()
      .then(r => {
        setProductData(r.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isError) {
    return <AlternateSection error />;
  }

  if (isLoading) {
    return <AlternateSection loading />;
  }

  const switchProductDetail = () => {
    const { orderType } = props.location.state;
    switch (orderType) {
      case 'FLG':
        return <MyFlightOrderDetail data={productData} />;
      case 'HTL':
        return <MyHotelOrderDetail data={productData} />;
      default:
        return <div />;
    }
  };

  const switchPriceTable = () => {
    const { orderType } = props.location.state;
    switch (orderType) {
      case 'FLG':
        return <PriceTable price={productData.price} label="Adult (x2)" />;
      case 'HTL':
        return <PriceTable price={productData.price} label={`${productData.duration} Day(s)`} />;
      default:
        return <div />;
    }
  };

  return (
    <Section>
      <div className="container">
        <SectionHeader title="My Order Detail" size={2} />
        <div className="box">
          <div className="columns">
            <div className="column">{switchProductDetail()}</div>
            <div className="column">{switchPriceTable()}</div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default MyOrderDetailPage;
