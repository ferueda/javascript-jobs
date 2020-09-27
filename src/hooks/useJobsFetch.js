import { useEffect, useReducer } from 'react';
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
    case 'UPDATE_CITY':
      return {
        ...state,
        jobs: [],
        filters: [],
        skip: 0,
        totalRows: 0,
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

export const useJobsFetch = (city) => {
  const [
    { jobs, isLoading, isError, hasMore, skip, filters, totalRows },
    dispatchJobsFetch,
  ] = useReducer(jobsFetchReducer, {
    jobs: [],
    isLoading: false,
    isError: false,
    hasMore: false,
    skip: 0,
    filters: [],
    totalRows: 0,
  });

  const baseURL = 'https://au-js-jobs.herokuapp.com/jobs';
  // const baseURL = 'http://localhost:3001/jobs';
  // const baseURL = 'http://localhost:3001/jobs';

  const URL = generateURL(baseURL, city, skip, filters);

  useEffect(() => {
    const abortController = new AbortController();

    dispatchJobsFetch({ type: 'FETCH_INIT' });

    fetch(URL, { signal: abortController.signal })
      .then((res) => res.json())
      .then((data) => {
        dispatchJobsFetch({
          type: 'FETCH_SUCCESS',
          payload: {
            jobs: data.jobs,
            remainingRows: data.pagination.remainingRows,
            totalRows: data.pagination.totalRows,
          },
        });
      })
      .catch(() => {
        if (!abortController.signal.aborted) {
          dispatchJobsFetch({ type: 'FETCH_FAILURE' });
        }
      });

    return () => abortController.abort();
  }, [URL]);

  return {
    isLoading,
    jobs,
    hasMore,
    isError,
    dispatchJobsFetch,
    skip,
    filters,
    totalRows,
  };
};
