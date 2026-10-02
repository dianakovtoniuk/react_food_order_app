import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest<T>(
  url: string,
  config: RequestInit
): Promise<T> {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

export default function useHttp<T>(
  url: string,
  config: RequestInit,
  initialData: T
) {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data?: string) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest<T>(url, {
          ...config,
          body: data,
        });
        setData(resData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Something went wrong!'
        );
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}