import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const existingValue = window.localStorage.getItem(key);
      return existingValue ? JSON.parse(existingValue) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  function setValue(newValue) {
    try {
      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(error);
    }
  }

  function removeValue() {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
        console.error(error);
    }
  }

  return [storedValue, setValue, removeValue];
}
