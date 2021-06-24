import {userSession} from 'common/stacks';
import {useDispatch} from 'react-redux';
import {setAuthLoading, setAuthUser} from 'store/auth';

function useConnectAuthOptions() {
  const dispatch = useDispatch();
  const onFinish = ({
    //   authResponse, authResponsePayload,
    userSession: $userSession,
  }) => {
    const userData = $userSession?.loadUserData?.();
    dispatch(setAuthUser(userData));
    dispatch(setAuthLoading(false));
  };
  const onCancel = () => {
    dispatch(setAuthLoading(false));
  };
  const authOptions = {
    manifestPath: '/static/manifest.json',
    userSession,
    onFinish,
    onCancel,
    appDetails: {
      name: 'Jif Chat',
      icon: '/logo192.png',
    },
  };
  return authOptions;
}

export {useConnectAuthOptions};
