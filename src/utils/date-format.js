const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const displayDate = dateStr => {
  const d = new Date(dateStr);

  return `${months[d.getMonth()]} ${d.getFullYear()}`;
};
