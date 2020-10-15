import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

/**
 * Hook for fetching data with handling for isLoading and errors.
 * <https://andrewmmc.com/blog/2020/handle-fetch-state-in-react-hooks/>
 * @param {*} dataUrl
 */
export const useRequest = (dataUrl) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios(dataUrl);
        if (!ignore) setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    return () => {
      ignore = true;
    };
  }, [dataUrl]);
  return { data, loading, error };
};

/**
 * Get params from the url for react router pages.
 * @example
 *  const urlParamsObj = getUrlParamsObj();
 *  const id = urlParamsObj.get("id");
 * @returns {Object} Use .get('x') to access the params
 */
export const getUrlParamsObj = () => {
  return new URLSearchParams(useLocation().search);
};
