/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../util/auth';
import FlightOrderDetail from '../../components/FlightOrderDetail';
import HotelOrderDetail from '../../components/HotelOrderDetail';
import PackageOrderDetail from '../../components/PackageOrderDetail';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import './styles.scss';
import Divider from '../../components/Divider';
import { useRouter } from '../../util/router';
import { BACKEND_URL, ENDPOINT, PRODUCT_TYPE } from '../../data/constants';
import AlternateSection from '../../components/AlternateSection';
import { formatDateWithStripe, dayDiff } from '../../util/display';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
const validNumber = RegExp(/^\d+$/);

const Field = props => {
  const { label, addon, name, value, placeholder, type, help, error, disabled } = props;
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        {label && <label className="label">{label}</label>}
      </div>
      <div className="field-body">
        <div className="field is-expanded">
          <div className={`field${addon ? ' has-addons' : ''}`}>
            {addon && (
              <p className="control">
                <a className="button is-static">{addon}</a>
              </p>
            )}
            <p className="control is-expanded">
              <input
                name={name}
                value={value}
                className="input"
                type={type || 'text'}
                placeholder={placeholder}
                disabled={disabled}
                onChange={e => props.onChange(e.target.value)}
              />
            </p>
          </div>
          {help && <p className="help">{help}</p>}
          {error && <p className="help is-danger">{error.message}</p>}
        </div>
      </div>
    </div>
  );
};

const OrderDetailPage = props => {
  const auth = useAuth();
  const router = useRouter();

  // fetch data
  const [packageDetail, setPackageDetail] = useState({});
  const [flightDetail, setFlightDetail] = useState({});
  const [flightDetailReturn, setFlightDetailReturn] = useState({});
  const [hotelDetail, setHotelDetail] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowErrorModal, setIsShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // inputs
  // customer
  const [firstCustomerName, setFirstCustomerName] = useState('');
  const [secondCustomerName, setSecondCustomerName] = useState('');
  const [firstCustomerIDNumber, setFirstCustomerIDNumber] = useState('');
  const [secondCustomerIDNumber, setSecondCustomerIDNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  // payment
  const [cardHolderName, setCardHolderName] = useState('');
  const [ccNumber, setCCNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCVC] = useState('');
  // errors
  const errors = [];
  const [showErrorHelp, setShowErrorHelp] = useState(false);

  const getError = field => {
    return errors.find(e => e.field === field);
  };

  const isEmpty = val => val.trim() === '';

  if (isEmpty(firstCustomerName)) {
    errors.push({
      field: 'firstCustomerName',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(firstCustomerIDNumber)) {
    errors.push({
      field: 'firstCustomerIDNumber',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(secondCustomerName)) {
    errors.push({
      field: 'secondCustomerName',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(secondCustomerIDNumber)) {
    errors.push({
      field: 'secondCustomerIDNumber',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(phone)) {
    errors.push({
      field: 'phone',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(email)) {
    errors.push({
      field: 'email',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(ccNumber)) {
    errors.push({
      field: 'ccNumber',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(cardHolderName)) {
    errors.push({
      field: 'cardHolderName',
      message: "This field can't be empty",
    });
  }

  if (isEmpty(expirationDate)) {
    errors.push({
      field: 'expirationDate',
      message: "This field can't be empty",
    });
  }

  if (!cvc) {
    errors.push({
      field: 'cvc',
      message: "This field can't be empty",
    });
  }

  if (firstCustomerName.length < 5) {
    errors.push({
      field: 'firstCustomerName',
      message: 'Full Name must be 5 characters long.',
    });
  }

  if (secondCustomerName.length < 5) {
    errors.push({
      field: 'secondCustomerName',
      message: 'Full Name must be 5 characters long.',
    });
  }

  if (!validNumber.test(phone)) {
    errors.push({
      field: 'phone',
      message: 'Phone is not valid.',
    });
  }

  if (!validEmailRegex.test(email)) {
    errors.push({
      field: 'email',
      message: 'Email is not valid.',
    });
  }

  if (!validNumber.test(ccNumber)) {
    errors.push({
      field: 'ccNumber',
      message: 'Card is not valid.',
    });
  }

  if (cardHolderName.length < 5) {
    errors.push({
      field: 'cardHolderName',
      message: 'Full Name must be 5 characters long.',
    });
  }

  if (!validNumber.test(cvc)) {
    errors.push({
      field: 'cvc',
      message: 'CVC is not valid.',
    });
  }

  async function fetchAll() {
    try {
      await Promise.all([
        fetch(
          `${BACKEND_URL}${ENDPOINT.GET_PASSENGER}?email=${auth.user ? auth.user.email : ''}`,
        ).then(response => response.json()),
        fetch(
          `${BACKEND_URL}${ENDPOINT.GET_PAYMENT}?email=${auth.user ? auth.user.email : ''}`,
        ).then(response => response.json()),
      ])
        .then(r => {
          const [passengerRes, paymentRes] = r;

          // passenger
          if (passengerRes.data && passengerRes.data.length !== 0) {
            const firstCustomer = passengerRes.data[0];
            const secondCustomer = passengerRes.data[1];
            setFirstCustomerName(firstCustomer.name);
            setFirstCustomerIDNumber(firstCustomer.identityNumber);
            setSecondCustomerName(secondCustomer.name);
            setSecondCustomerIDNumber(secondCustomer.identityNumber);
            setPhone(firstCustomer.phone.substr(1));
            setEmail(firstCustomer.email);
          }

          // payment
          if (paymentRes.data && paymentRes.data.length !== 0) {
            const dateParts = paymentRes.data.validDate.split('/');
            const formattedDateResp = `${dateParts[1]}-${dateParts[0]}`;
            setCCNumber(paymentRes.data.cardNumber);
            setCardHolderName(paymentRes.data.cardHolderName);
            setExpirationDate(formattedDateResp);
            setCVC(paymentRes.data.cvv);
          }
          setIsLoading(false);
        })
        .catch(e => {
          console.log(e);
          setIsError(true);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const setProduct = () => {
    const { type, info } = props.location.state;
    switch (type) {
      case PRODUCT_TYPE.FLIGHTS: {
        const { flightInfo } = info;
        setFlightDetail(flightInfo);
        break;
      }
      case PRODUCT_TYPE.HOTELS: {
        const { hotelInfo } = info;
        setHotelDetail(hotelInfo);
        break;
      }
      case PRODUCT_TYPE.PACKAGES: {
        const { packageInfo, flightInfo, flightInfoReturn, hotelInfo } = info;
        setPackageDetail(packageInfo);
        setFlightDetail(flightInfo);
        setFlightDetailReturn(flightInfoReturn);
        setHotelDetail(hotelInfo);
        break;
      }
      default:
        setIsError(true);
        break;
    }
  };

  const constructOrderBody = () => {
    const { type } = props.location.state;
    const dateNow = new Date();
    const orderDate = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`;
    const orderTime = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;

    let price;
    switch (type) {
      case PRODUCT_TYPE.FLIGHTS: {
        price = flightDetail.price;
        break;
      }
      case PRODUCT_TYPE.HOTELS: {
        const { price: hotelPrice, startDate, endDate } = hotelDetail;
        price = hotelPrice * dayDiff(startDate, endDate);
        break;
      }
      case PRODUCT_TYPE.PACKAGES: {
        price = packageDetail.price;
        break;
      }
      default:
        price = 0;
        break;
    }

    const result = {
      email: auth.user.email,
      orderDate,
      orderTime,
      price,
      orderData: {
        email,
        titleFirstPassenger: 'Mr.',
        nameFirstPassenger: firstCustomerName,
        titleSecondPassenger: 'Mrs.',
        nameSecondPassenger: secondCustomerName,
        phone,
        identityNumber: firstCustomerIDNumber,
      },
    };

    switch (type) {
      case PRODUCT_TYPE.FLIGHTS: {
        return {
          ...result,
          flightDetail: {
            flightId: flightDetail.flightId,
            numberOfSeat: 2,
            price: flightDetail.price,
            date: flightDetail.startDate,
          },
        };
      }
      case PRODUCT_TYPE.HOTELS: {
        const { roomId, startDate, endDate } = hotelDetail;
        return {
          ...result,
          hotelDetail: {
            roomId,
            checkinDate: formatDateWithStripe(startDate),
            checkoutDate: formatDateWithStripe(endDate),
            price: hotelDetail.price * dayDiff(startDate, endDate),
          },
        };
      }
      default:
        return {};
    }
  };

  async function submitAll() {
    const passengers = [];
    const parts = expirationDate.split('-');
    const validDate = `${parts[1]}/${parts[0]}`;
    passengers.push({
      name: firstCustomerName,
      gender: 'L',
      identityNumber: firstCustomerIDNumber,
    });
    passengers.push({
      name: secondCustomerName,
      gender: 'P',
      identityNumber: secondCustomerIDNumber,
    });

    const registerBody = {
      email: auth.user.email,
      passengers,
    };

    const paymentMethodBody = {
      email: auth.user.email,
      cardNumber: ccNumber,
      cardHolderName,
      validDate,
      cvv: cvc,
    };

    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    console.log('registerBody', registerBody);
    console.log('paymentMethodBody', paymentMethodBody);
    console.log('orderBody', constructOrderBody());

    try {
      if (auth.user) {
        await Promise.all([
          fetch(`${BACKEND_URL}${ENDPOINT.POST_REGISTER}`, {
            ...init,
            body: JSON.stringify(registerBody),
          }),
          fetch(`${BACKEND_URL}${ENDPOINT.POST_PAYMENT_METHOD}`, {
            ...init,
            body: JSON.stringify(paymentMethodBody),
          }),
          fetch(`${BACKEND_URL}${ENDPOINT.POST_ORDER_SUBMIT}`, {
            ...init,
            body: JSON.stringify(constructOrderBody()),
          }),
        ])
          .then(() => {
            setIsShowModal(true);
          })
          .catch(() => {
            setIsShowErrorModal(true);
          });
      } else {
        await fetch(`${BACKEND_URL}${ENDPOINT.POST_ORDER_SUBMIT}`, {
          ...init,
          body: JSON.stringify(constructOrderBody()),
        })
          .then(() => {
            setIsShowModal(true);
          })
          .catch(() => {
            setIsShowErrorModal(true);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAll();
    setProduct();
  }, [auth.user]);

  const checkout = () => {
    if (errors.length) {
      setShowErrorHelp(true);
    } else {
      submitAll();
    }
  };
  const closeModal = () => {
    setIsShowModal(false);
    if (auth.user) {
      router.push('/myorders');
    } else {
      router.push('/');
    }
  };

  const closeErrorModal = () => {
    setIsShowErrorModal(false);
  };

  const productOrderDetail = () => {
    const { type, info } = props.location.state;
    switch (type) {
      case PRODUCT_TYPE.FLIGHTS:
        return <FlightOrderDetail data={flightDetail} />;
      case PRODUCT_TYPE.HOTELS: {
        return <HotelOrderDetail data={hotelDetail} />;
      }
      case PRODUCT_TYPE.PACKAGES: {
        return (
          <PackageOrderDetail
            packageDetail={packageDetail}
            flightDetail={flightDetail}
            flightDetailReturn={flightDetailReturn}
            hotelDetail={hotelDetail}
          />
        );
      }
      default:
        return <div />;
    }
  };

  if (isLoading) {
    return (
      <Section>
        <div className="container OrderDetail__alternate-view">
          <AlternateSection loading />
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section>
        <div className="container OrderDetail__alternate-view">
          <AlternateSection error />
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="container">
        <SectionHeader title="Order Detail" size={2} />
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box">{productOrderDetail()}</div>
          </div>
          <div className="tile is-8 is-vertical is-parent">
            <div className="tile is-child box">
              <div>
                <p className="title">Customer Detail</p>
                <Divider color="dark" />
                <br />
                <div>
                  <Field
                    label="Customer 1"
                    name="firstCustomerName"
                    value={firstCustomerName}
                    onChange={value => setFirstCustomerName(value)}
                    addon="Mr."
                    placeholder="Full Name"
                    error={showErrorHelp && getError('firstCustomerName')}
                  />
                  <Field
                    name="firstCustomerIDNumber"
                    value={firstCustomerIDNumber}
                    onChange={value => setFirstCustomerIDNumber(value)}
                    placeholder="ID Card Number"
                    error={showErrorHelp && getError('firstCustomerIDNumber')}
                  />
                  <Field
                    label="Customer 2"
                    name="secondCustomerName"
                    value={secondCustomerName}
                    onChange={value => setSecondCustomerName(value)}
                    addon="Mrs."
                    placeholder="Full Name"
                    error={showErrorHelp && getError('secondCustomerName')}
                  />
                  <Field
                    name="secondCustomerIDNumber"
                    value={secondCustomerIDNumber}
                    onChange={value => setSecondCustomerIDNumber(value)}
                    placeholder="ID Card Number"
                    error={showErrorHelp && getError('secondCustomerIDNumber')}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    value={phone}
                    onChange={value => setPhone(value)}
                    addon="+62"
                    placeholder="Phone Number"
                    help="Do not enter the first zero."
                    error={showErrorHelp && getError('phone')}
                  />
                  <Field
                    label="Email"
                    name="email"
                    value={email}
                    onChange={value => setEmail(value)}
                    placeholder="Email Address"
                    error={showErrorHelp && getError('email')}
                  />
                </div>
              </div>
            </div>
            <div className="tile is-child box">
              <div>
                <p className="title">Payment Detail</p>
                <Divider color="dark" />
                <br />
                <div>
                  <Field
                    label="CC Number"
                    name="ccNumber"
                    value={ccNumber}
                    onChange={value => setCCNumber(value)}
                    placeholder="Your Card Number"
                    error={showErrorHelp && getError('ccNumber')}
                  />
                  <Field
                    label="Name"
                    name="cardHolderName"
                    value={cardHolderName}
                    onChange={value => setCardHolderName(value)}
                    placeholder="You Name on Card"
                    error={showErrorHelp && getError('cardHolderName')}
                  />
                  <Field
                    label="Expiration Date"
                    name="expirationDate"
                    value={expirationDate}
                    onChange={value => setExpirationDate(value)}
                    placeholder="Expiration Date of the Card"
                    error={showErrorHelp && getError('expirationDate')}
                    type="month"
                  />
                  <Field
                    label="CVC"
                    name="cvc"
                    value={cvc}
                    onChange={value => setCVC(value)}
                    placeholder="Card's CVC"
                    error={showErrorHelp && getError('cvc')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns is-mobile is-centered">
          <div className="column is-narrow">
            <button type="submit" className="button is-success is-centered" onClick={checkout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
      {isShowModal && (
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content">
            <div className="box">
              <p className="has-text-weight-bold has-text-centered is-size-4">Thank You.</p>
              <br />
              <span className="OrderDetail__success-icon has-text-success">
                <i className="fas fa-3x fa-check-circle" />
              </span>
              <br />
              <p className="has-text-centered">Your order has been paid successfully.</p>
              {!auth.user && (
                <p className="has-text-centered">The order detail is sent to your email.</p>
              )}
              <br />
              <div className="field is-grouped is-grouped-centered">
                <p className="control">
                  <button type="button" className="button is-primary" onClick={closeModal}>
                    {auth.user ? 'Go To My Order' : 'Go To Home'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {isShowErrorModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeErrorModal} />
          <div className="modal-content">
            <div className="box">
              Sorry, there was a problem in our system. Please try again later.
            </div>
          </div>
          <button
            type="button"
            onClick={closeErrorModal}
            className="modal-close is-large"
            aria-label="close"
          />
        </div>
      )}
    </Section>
  );
};

export default OrderDetailPage;
