import { useState } from "react";

// Por convención en React, los hooks empiezan con "use"
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Si existe el item en localStorage, lo parseamos; si no, devolvemos el valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => { // Corregido: "value" en minúscula
    try {
      // Guardamos en el estado de React
      setStoredValue(value);
      // Guardamos en el almacenamiento local del navegador (convertido a String)
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;