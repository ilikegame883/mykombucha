import { useState } from "react";

const initialVal = "";

//@param key = kombucha ID
const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialVal;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialVal;
    } catch (error) {
      console.log(error);
      return initialVal;
    }
  });

  const setLocalValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(value) : value;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [value, setLocalValue];
};

export default useLocalStorage;
