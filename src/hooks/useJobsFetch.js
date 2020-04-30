import { useState, useEffect } from 'react';

export const useJobsFetch = (city, skip) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const baseURL = 'http://localhost:3001/jobs';

  useEffect(() => {
    let didCancel = false;

    setIsLoading(true);

    fetch(`${baseURL}?city=${city}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        if (!didCancel) {
          setJobs((jobs) => [...jobs, ...data.jobs]);
          setHasMore(data.pagination.remainingRows > 0);
          setIsLoading(false);
        }
      });

    return () => {
      didCancel = true;
    };
  }, [city, skip]);

  return { isLoading, jobs, setJobs, hasMore };
};
