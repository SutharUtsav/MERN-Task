import { useEffect, useState } from "react"

export function useApiCall(api) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api();
        if (response.data.status === 1) {
          setData(response.data);
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (error === null) {
      if (data === null) {
        fetchData();
      }
    }

  }, [data, error, api]);

  return { data, setData, error, setError, loading, setLoading };

}
