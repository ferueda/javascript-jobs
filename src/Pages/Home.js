import React, { useCallback } from 'react';
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

  const { filters, setFilters } = useFilters();
  const { jobs, isLoading, hasMore, dispatchJobsFetch, totalRows } = useJobsFetch(city, filters);

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
    if (filters.includes(filter)) {
      setFilters((state) => state.filter((f) => f !== filter));
    } else {
      setFilters((state) => [...state, filter]);
    }

    dispatchJobsFetch({
      type: 'UPDATE_FILTERS',
    });
  };

  const handleCityUpdate = () => {
    setFilters([]);
    dispatchJobsFetch({ type: 'UPDATE_CITY' });
  };

  const handleResetFilters = () => {
    setFilters([]);
    dispatchJobsFetch({
      type: 'UPDATE_FILTERS',
    });
  };

  if (!cities.includes(city)) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <Hero
        handleSearch={handleSearch}
        handleResetFilters={handleResetFilters}
        handleCityUpdate={handleCityUpdate}
      />
      <Nav handleFilters={handleFilters} filters={filters} />

      {filters.length >= 1 ? (
        <SearchGuide handleTagRemove={handleFilters} filters={filters} />
      ) : null}

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
