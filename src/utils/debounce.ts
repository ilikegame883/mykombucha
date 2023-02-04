const debounce = (func, wait = 0) => {
  let timeoutID = null;

  return function (...args: any) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func.call(this, ...args);
    }, wait);
  };
};

export default debounce;
