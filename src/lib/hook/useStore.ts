import { useState, useEffect } from "react";

const useStore = <T, F>(
  // eslint-disable-next-line no-unused-vars
  store: (callback: (state: T) => unknown) => unknown,
  // eslint-disable-next-line no-unused-vars
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;
