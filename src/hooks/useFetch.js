import axios from "axios";
import { useEffect } from "react";

const useFetch = (url, params, setData, key, LIMIT_TAKE = 10) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url, {
        params: {
          take: params.get("take") ?? LIMIT_TAKE,
        },
      });
      setData(response.data[key]);
    };
    fetchData();
  }, [url, params, setData, key, LIMIT_TAKE]);
};

export default useFetch;
