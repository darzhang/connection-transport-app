import { useState } from "react";

type FetchProps<T> = {
  url: string;
  method?: "GET" | "POST";
  body?: Record<string, string | number> | null;
};

type RequestOptionsType = {
  method: string;
  headers?: Record<string, string>;
  body?: string;
};

type FetchData<T> = T & { error?: string };

const useFetch = <T>({ url, method = "GET", body = null }: FetchProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Set up the request options
      let requestOptions: RequestOptionsType = { method };
      if (method === "POST" && body) {
        requestOptions = {
          ...requestOptions,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        };
      }

      // Fetch the data
      const response = await fetch(url, requestOptions);

      const data: FetchData<T> = await response.json();

      if (!response.ok) throw new Error(data.error ?? "An error occurred");

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
