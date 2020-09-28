import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const useFilters = () => {
  const { search } = useLocation();

  const query = queryString.parse(search);

  const [filters, setFilters] = useState(query.q ? [...query.q.split(' ')] : []);
  const history = useHistory();

  useEffect(() => {
    const queryObject = {};

    if (filters.length > 0) {
      queryObject.q = filters.reduce((acc, curr) => acc + curr + ' ', '').trim();
    }

    history.push({
      ...history.location,
      search: queryString.stringify(queryObject).replace(/%20/g, '+'),
    });
  }, [filters, history]);

  return {
    filters,
    setFilters,
  };
};

export default useFilters;
