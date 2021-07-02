import {Typography} from '@material-ui/core';
import {useJifBalance} from 'common/hooks/useJifBalance';
import React from 'react';

function AccountBalance() {
  const data = useJifBalance();
  return <Typography>{data || 0} JIF</Typography>;
}

export default AccountBalance;
