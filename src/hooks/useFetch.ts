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

  // fetchData now accepts url and body, allowing for more dynamic requests
  const fetchData = async ({
    url,
    method = "GET",
    body = null,
  }: FetchProps & {
    url: string;
    body?: Record<string, any> | null;
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
    } catch (error: any) {
      setData(null);
      // Show a toast notification with the error message
      toast.error("Something went wrong", {
        description: error.message,
      });

      // Rethrow the error so the component can handle it
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, fetchData };
};

export default useFetch;
