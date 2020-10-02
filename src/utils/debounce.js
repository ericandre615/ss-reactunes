const debounce = (fn, wait) => {
  let timeout;

  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;
