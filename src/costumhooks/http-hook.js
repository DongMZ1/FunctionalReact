import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const sendRequest = useCallback(
    async (url, method = 'POST', body = null, headers = {}) => {
      setIsLoading(true);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();

 

        if (!response.ok) {
          throw Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };


  return [ isLoading, error, setError, sendRequest, clearError ];
};
