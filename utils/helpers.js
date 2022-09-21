module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return new Date(date).toLocaleDateString();
  },
  format_datetime: (date) => {
    return new Date(date).toLocaleString();
  },
  format_money: (amount) => {
    // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  },
  trim_string: (value) => {
    return value.trim();
  },
};
