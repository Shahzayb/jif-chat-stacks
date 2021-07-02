import {useGetJifBalanceQuery} from 'store/api';
import {useCurrentAddress} from './useCurrentAddress';

function useJifBalance() {
  const address = useCurrentAddress();
  const {data} = useGetJifBalanceQuery(address, {
    pollingInterval: 1000 * 60,
  });

  return data || 0;
}

export {useJifBalance};
