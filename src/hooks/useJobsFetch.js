import { useEffect, useReducer, useRef } from 'react';
import { generateURL } from '../utils/helpers';

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
        totalRows: action.payload.totalRows,
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
        totalRows: 0,
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
          jobs: [],
          skip: 0,
          filters: state.filters.filter((f) => f !== action.payload),
          totalRows: 0,
        };
      } else {
        return {
          ...state,
          jobs: [],
          skip: 0,
          filters: [...state.filters, action.payload],
          totalRows: 0,
        };
      }
    case 'SEARCH':
      if (action.payload.trim() !== '') {
        return {
          ...state,
          jobs: [],
          skip: 0,
          totalRows: 0,
          filters: [action.payload.toLowerCase().trim()],
        };
      } else return state;
    default:
      return state;
  }
};

export const useJobsFetch = () => {
  const [
    { jobs, isLoading, isError, hasMore, skip, city, filters, totalRows },
    dispatchJobsFetch,
  ] = useReducer(jobsFetchReducer, {
    jobs: [],
    isLoading: false,
    isError: false,
    hasMore: false,
    skip: 0,
    city: localStorage.getItem('city') || 'sydney',
    filters: [],
    totalRows: 0,
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

  useEffect(() => {
    let didCancel = false;

    dispatchJobsFetch({ type: 'FETCH_INIT' });

    fetch(generateURL(baseURL, city, skip, filters))
      .then((res) => res.json())
      .then((data) => {
        if (!didCancel) {
          dispatchJobsFetch({
            type: 'FETCH_SUCCESS',
            payload: {
              jobs: data.jobs,
              remainingRows: data.pagination.remainingRows,
              totalRows: data.pagination.totalRows,
            },
          });
        }
      })
      .catch(() => dispatchJobsFetch({ type: 'FETCH_FAILURE' }));

    return () => {
      didCancel = true;
    };
  }, [city, skip, filters]);

  return {
    isLoading,
    jobs,
    hasMore,
    isError,
    dispatchJobsFetch,
    skip,
    city,
    filters,
    totalRows,
  };
};
