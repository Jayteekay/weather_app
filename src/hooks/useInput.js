import { useState } from "react";

const useInput = (initialData = {}) => {
  const [data, setData] = useState(initialData);
  const handleInput = (e) => {
    let target = e.target;
    setData((oldData) => {
      return {
        ...oldData,
        [target.name]: target.value,
      };
    });
  };
  return [data, handleInput];
};

export default useInput;
