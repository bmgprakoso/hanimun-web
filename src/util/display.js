import moment from 'moment';

const formatPrice = a => {
  return `${a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} IDR`;
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

const timeDiff = (before, after) => {
  const beforeTime = moment(before, 'HH:m:s');
  const afterTime = moment(after, 'HH:m:s');
  const duration = moment.duration(afterTime.diff(beforeTime));
  const hours = parseInt(duration.asHours());
  const minutes = parseInt(duration.asMinutes() % 60);
  return `${hours} hour(s)${minutes > 0 ? ` ${minutes} minute(s)` : ''}`;
};

export { formatHourMinute, formatPrice, timeDiff };
