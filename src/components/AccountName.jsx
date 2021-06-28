import {Typography} from '@material-ui/core';
import {useAccountName} from 'common/hooks/useAccountName';
import React from 'react';

function AccountName(props) {
  const name = useAccountName();
  return <Typography {...props}>{name}</Typography>;
}

export default AccountName;
