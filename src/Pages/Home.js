import React, { useCallback, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import JobList from '../components/JobList';
import Hero from '../components/Hero/Hero';
import Nav from '../components/Nav';
import SearchGuide from '../components/SearchGuide';

import { useJobsFetch } from '../hooks/useJobsFetch';
import useFilters from '../hooks/useFilters';

import * as ROUTES from '../constants/routes';
import cities from '../constants/cities';

const Home = () => {
  const { city } = useParams();

  const { jobs, isLoading, hasMore, dispatchJobsFetch, filters, totalRows } = useJobsFetch(city);

  const { filters: newFilters, setFilters } = useFilters();

  const handleSearch = useCallback(
    (event) => {
      event.preventDefault();
      const filter = event.target.tech.value;
      setFilters([filter]);
      dispatchJobsFetch({
        type: 'SEARCH',
        payload: filter,
      });
    },
    [dispatchJobsFetch, setFilters],
  );

  const handleFilters = (filter) => {
    const lcFilter = filter.toLowerCase();

    if (newFilters.includes(lcFilter)) {
      setFilters((state) => state.filter((f) => f !== lcFilter));
    } else {
      setFilters((state) => [...state, lcFilter]);
    }

    dispatchJobsFetch({
      type: 'CHANGE_FILTERS',
      payload: lcFilter,
    });
  };

  useEffect(() => {
    setFilters([]);
    dispatchJobsFetch({ type: 'UPDATE_CITY' });
  }, [city, dispatchJobsFetch, setFilters]);

  if (!cities.includes(city)) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <Hero handleSearch={handleSearch} />
      <Nav handleFilters={handleFilters} filter={filters} />

      {filters >= 1 ? <SearchGuide handleTagRemove={handleFilters} filter={filters} /> : null}

      <JobList
        jobs={jobs}
        loading={isLoading}
        hasMore={hasMore}
        dispatchJobsFetch={dispatchJobsFetch}
        totalRows={totalRows}
      />
    </>
  );
};

export default Home;
