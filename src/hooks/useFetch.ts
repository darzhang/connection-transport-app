import { useState } from "react";
import { toast } from "sonner";

// Removed the generic type from FetchProps as it's no longer needed there
type FetchProps = {
  method?: "GET" | "POST";
};

type RequestOptionsType = {
  method: string;
  headers?: Record<string, string>;
  body?: string;
};

// FetchData type now only needs to represent the data structure
type FetchData<T> = T & { error?: string };

// The hook itself no longer needs to take the initial configuration
const useFetch = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false); // Initially not loading
  const [error, setError] = useState<string | null>(null);

  // fetchData now accepts url and body, allowing for more dynamic requests
  const fetchData = async ({
    url,
    method = "GET",
    body = null,
  }: FetchProps & {
    url: string;
    body?: Record<string, string | number> | null;
  }) => {
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

      // Assuming your API structure includes an error field in case of failure
      const data: FetchData<T> = await response.json();

      if (!response.ok) throw new Error(data.error ?? "An error occurred");

      setData(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setData(null);
      toast.error("Something went wrong", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData };
};

export default useFetch;
