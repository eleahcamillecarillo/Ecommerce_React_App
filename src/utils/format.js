export const formatCurrency = (amount) =>
  `Php ${new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)}`;
