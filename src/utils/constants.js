import moment from 'moment';

export default {
  systemConstants: {
    searchDayRange: 90,
    searchMonthRange: 12,
    beginDay:  moment().subtract(89, 'days').format('YYYY-MM-DD'),
    endDay: moment().format('YYYY-MM-DD'),
    beginMonth: moment().subtract(11, 'month').format('YYYY-MM'),
    endMonth: moment().format('YYYY-MM'),
    pageSize: 10,
    pageSizeOption: ['10', '30', '50'],
  }
};