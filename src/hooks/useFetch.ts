import { useState } from "react";

type FetchProps = {
  url: string;
  method?: "GET" | "POST";
  body?: Record<string, string | number> | null;
};

type RequestOptionsType = {
  method: string;
  headers?: Record<string, string>;
  body?: string;
};

const useFetch = ({ url, method = "GET", body = null }: FetchProps) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Set up the request options
      let requestOptions = {} as RequestOptionsType;
      if (method === "GET") {
        requestOptions = {
          method,
        };
      } else if (method === "POST" && body) {
        requestOptions = {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        };
      }

      if (method === "POST" && body) {
        requestOptions.body = JSON.stringify(body);
      }

      // Fetch the data
      const response = await fetch(url, requestOptions);

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setData(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData };
};

export default useFetch;
