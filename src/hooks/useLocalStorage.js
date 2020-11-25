import {useEffect, useState} from 'react';
import { LOCAL_STORAGE_PREFIX } from '../utils/constants';

const useLocalStorage = (key) => {

  const [value, setValue] = useState(null);

  const storeValue = (v) => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key, typeof v == "string" ? v : JSON.stringify(v))
    setValue(v)
  }

  const removeValue = () => {
    localStorage.removeItem(LOCAL_STORAGE_PREFIX + key)
  }

  useEffect(() => {
    setValue(localStorage.getItem(LOCAL_STORAGE_PREFIX + key))
  }, [key])

  return {value, storeValue, removeValue}
}

export default useLocalStorage