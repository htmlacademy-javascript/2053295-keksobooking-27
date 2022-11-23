const debounce = (callback, timeoutDelay = 500) => {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscape = (e) => e.key === 'Escape';

export {
  debounce,
  isEscape,
};
