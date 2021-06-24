import React from 'react';
import {useSelector} from 'react-redux';
import {userSelector} from 'store/auth';

function useUser() {
  const user = useSelector(userSelector);

  const data = React.useMemo(
    () => ({
      user,
      profile: user?.profile,
      addresses: user?.profile?.stxAddress,
      isSignedIn: !!user,
    }),
    [user]
  );

  return data;
}

export {useUser};
