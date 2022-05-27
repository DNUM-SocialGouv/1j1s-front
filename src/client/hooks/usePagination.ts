import {
  useEffect,
  useState,
} from 'react';

import useQueryParams, { QueryParams } from '~/client/hooks/useQueryParams';

export default function usePagination() {
  const { isKeyInQueryParams, getQueryValue } = useQueryParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(isKeyInQueryParams(QueryParams.PAGE) ? Number(getQueryValue(QueryParams.PAGE)) : 1);
  }, [setPage, isKeyInQueryParams, getQueryValue]);
  return {
    page,
    setPage,
  };
}
