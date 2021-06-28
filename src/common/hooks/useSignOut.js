import React from 'react';
import {useDispatch} from 'react-redux';
import {setAuthUser} from 'store/auth';
import {userSession} from 'common/stacks';

function useSignOut() {
  const dispatch = useDispatch();

  const signOut = React.useCallback(() => {
    userSession?.signUserOut?.();
    dispatch(setAuthUser(null));
  }, [dispatch]);

  return signOut;
}

export {useSignOut};
