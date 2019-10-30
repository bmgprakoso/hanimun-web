const BACKEND_URL = 'http://irmalaily.pythonanywhere.com/';
const ENDPOINT = {
  GET_AIRPORT: 'airport',
  GET_FLIGHT_SEARCH_RESULT: 'flight/list',
  GET_PASSENGER: 'passenger',
  GET_PAYMENT: 'user/payment',
  GET_FLIGHT_DETAIL: 'flight/detail',
  POST_ORDER_SUBMIT: 'order/submit',
  POST_REGISTER: 'register',
  POST_PAYMENT_METHOD: 'user/submit-payment',
};

const AIRLINE_LOGO = [
  {
    name: 'Garuda Indonesia',
    url: 'http://tinyimg.io/i/d7VvvfP.jpeg',
  },
  {
    name: 'Batik Air',
    url: 'http://tinyimg.io/i/MI0TGAf.jpg',
  },
  {
    name: 'Air Asia',
    url: 'http://tinyimg.io/i/DreDjBM.png',
  },
  {
    name: 'Citilink',
    url: 'http://tinyimg.io/i/Saz6WZ1.jpeg',
  },
  {
    name: 'Wing Air',
    url: 'http://tinyimg.io/i/EdhJ3Lt.png',
  },
  {
    name: 'Lion Air',
    url: 'http://tinyimg.io/i/D8dRm9l.png',
  },
  {
    name: 'Sriwijaya Air',
    url: 'http://tinyimg.io/i/QRdb3Jo.jpeg',
  },
];

export { BACKEND_URL, ENDPOINT, AIRLINE_LOGO };
