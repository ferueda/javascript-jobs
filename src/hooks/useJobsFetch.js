import { useEffect, useReducer, useRef } from 'react';

const jobsFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        jobs: [...state.jobs, ...action.payload.jobs],
        hasMore: action.payload.remainingRows > 0,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'CHANGE_CITY':
      return {
        ...state,
        jobs: [],
        filters: [],
        skip: 0,
        city: action.payload.city,
      };
    case 'LOAD_MORE_JOBS':
      return {
        ...state,
        skip: state.skip + 20,
      };
    case 'CHANGE_FILTERS':
      if (state.filters.includes(action.payload)) {
        return {
          ...state,
          filters: state.filters.filter((f) => f !== action.payload),
        };
      } else {
        return {
          ...state,
          jobs: [],
          skip: 0,
          filters: [...state.filters, action.payload],
        };
      }
    default:
      return state;
  }
};

export const useJobsFetch = () => {
  const [
    { jobs, isLoading, isError, hasMore, skip, city, filters },
    dispatchJobsFetch,
  ] = useReducer(jobsFetchReducer, {
    jobs: [],
    isLoading: false,
    isError: false,
    hasMore: false,
    skip: 0,
    city: localStorage.getItem('city') || 'sydney',
    filters: [],
  });

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem('city', city);
    }
  }, [city]);

  // const baseURL = 'https://au-js-jobs.herokuapp.com/jobs';
  const baseURL = 'http://localhost:3001/jobs';
  const tagParams = filters.map((f) => f.replace(' ', '-')).join('+');

  useEffect(() => {
    let didCancel = false;

    dispatchJobsFetch({ type: 'FETCH_INIT' });

    fetch(`${baseURL}?city=${city}&skip=${skip}&tags=${tagParams}`)
      .then((res) => res.json())
      .then((data) => {
        if (!didCancel) {
          dispatchJobsFetch({
            type: 'FETCH_SUCCESS',
            payload: {
              jobs: data.jobs,
              remainingRows: data.pagination.remainingRows,
            },
          });
        }
      })
      .catch(() => dispatchJobsFetch({ type: 'FETCH_FAILURE' }));

    return () => {
      didCancel = true;
    };
  }, [city, skip, tagParams]);

  return {
    isLoading,
    jobs,
    hasMore,
    isError,
    dispatchJobsFetch,
    skip,
    city,
    filters,
  };
};
