import { useState, useEffect } from "react";

const useStorageState = (name, initialState, storageCondition) => {
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(name);
    if(item !== null && storageCondition) {
      return JSON.parse(item);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(state));
  }, [name, state]);

  return [state, setState];
};

export default useStorageState;
