const formatPrice = a => {
  return `${a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} IDR`;
};

const timeDiff = (before, after) => {
  return 'hehe';
};

export { formatPrice, timeDiff };
