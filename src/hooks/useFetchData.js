import { useEffect, useState } from "react";
import { fetchOptions } from "../utils/fetchOptions";

export default function useFetch({ url, page, query }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });

  useEffect(() => {
    const controller = new AbortController();

    if (!url || (!query && url.includes("search"))) return;

    async function fetchData() {
      let urlToCall = url;
      if (page) urlToCall += `?page=${page}`;
      if (query) urlToCall += `?query=${query}`;

      setLoading(true);

      try {
        const response = await fetch(urlToCall, {
          ...fetchOptions,
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Netwrok Issue");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log("Error name", err.name);
        if (err.name === "AbortError") console.log("request Aborted");
        else console.log("Error occuurred::", err.message);
        setError(() => ({ error: true, message: err.message }));
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, page, query]);
  return [data, loading, error];
}
