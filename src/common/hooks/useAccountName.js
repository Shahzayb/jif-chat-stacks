import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {accountNamesSelector} from 'store/auth';
import {getAccountNamesByAddress} from 'store/thunks/getAccountNamesByAddress';
import {truncateMiddle} from 'common/utils/stacks-utils';
import {useCurrentAddress, useCurrentMainnetAddress} from './useCurrentAddress';
import {useUser} from './useUser';

function useAccountName() {
  const {user} = useUser();
  const dispatch = useDispatch();
  const names = useSelector(accountNamesSelector);
  const address = useCurrentMainnetAddress();
  const testnetAddress = useCurrentAddress();
  const name = names?.[0];

  React.useEffect(() => {
    if (!name) {
      dispatch(getAccountNamesByAddress(address));
    }
  }, [address, dispatch, name]);

  return name || user?.username || truncateMiddle(testnetAddress);
}

export {useAccountName};
