import moment from 'moment';

const formatPrice = a => {
  return a ? `${a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} IDR` : '';
};

// from HH:m:s to HH:m
const formatHourMinute = string => {
  return string
    ? string
        .split(':')
        .slice(0, -1)
        .join(':')
    : '';
};

// from date to YYYY-MM-DD
const formatDateWithStripe = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// from date to "day, DD/MM/YYYY"
const formatDateComplete = date => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return `${days[date.getDay()]}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

const timeDiff = (before, after) => {
  const beforeTime = moment(before, 'HH:m:s');
  const afterTime = moment(after, 'HH:m:s');
  const duration = moment.duration(afterTime.diff(beforeTime));
  const hours = parseInt(duration.asHours());
  const minutes = parseInt(duration.asMinutes() % 60);
  return `${hours} hour(s)${minutes > 0 ? ` ${minutes} minute(s)` : ''}`;
};

const dayDiff = (before, after) => {
  const beforeTime = moment(before, 'HH:m:s');
  const afterTime = moment(after, 'HH:m:s');
  return `${afterTime.diff(beforeTime, 'days')}`;
};

export {
  formatHourMinute,
  formatDateWithStripe,
  formatDateComplete,
  formatPrice,
  timeDiff,
  dayDiff,
};
