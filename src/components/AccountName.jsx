import {useAccountName} from 'common/hooks/useAccountName';
import React from 'react';

function AccountName() {
  const name = useAccountName();
  return <div>{name}</div>;
}

export default AccountName;
