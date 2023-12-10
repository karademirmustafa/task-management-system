import { useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

export default function useQueryParams(query) {
  const history = useHistory();
  const { search } = useLocation();

  const updateQueryParams = useMemo(() => {
    const params = new URLSearchParams(search);

    Object.keys(query).forEach(key => {
      const value = query[key];
      if (value !== undefined && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    return params;
  }, [search, query]);

  const setQueryParams = () => {
    history.push({ search: updateQueryParams.toString() });
  };

  return { queryParams: updateQueryParams, setQueryParams };
}