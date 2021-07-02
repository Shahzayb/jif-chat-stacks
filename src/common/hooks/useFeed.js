import React from 'react';
import {useGetJifTransactionsQuery, useGetPendingJifTransactionsQuery} from 'store/api';

function useFeed() {
  const {data: completed} = useGetJifTransactionsQuery(undefined, {
    pollingInterval: 500,
  });
  const {data: pending} = useGetPendingJifTransactionsQuery(undefined, {
    pollingInterval: 1000,
  });
  const combined = React.useMemo(
    () => [...(pending || []), ...(completed || [])],
    [completed, pending]
  );

  return combined;
}

export {useFeed};
