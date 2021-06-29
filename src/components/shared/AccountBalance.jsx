import {Typography} from '@material-ui/core';
import {useCurrentAddress} from 'common/hooks/useCurrentAddress';
import React from 'react';
import {useGetJifBalanceQuery} from 'store/api';

function AccountBalance() {
  const address = useCurrentAddress();
  const {data} = useGetJifBalanceQuery(address, {
    pollingInterval: 1000 * 60,
  });
  return <Typography>{data || 0} JIF</Typography>;
}

export default AccountBalance;
