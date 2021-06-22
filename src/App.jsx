import React from 'react';
import {AppConfig, UserSession, Connect, useConnect} from '@stacks/connect-react';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({appConfig});

function useConnectAuthOptions() {
  const onFinish = ({authResponse, authResponsePayload, userSession: $userSession}) =>
    console.log('onFinish', {authResponse, authResponsePayload, $userSession});
  const onCancel = (...rest) => console.log('onCancel', rest);
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

export const ConnectWalletButton = () => {
  const {doOpenAuth} = useConnect();

  return (
    <button
      type="button"
      onClick={() => {
        doOpenAuth();
      }}
    >
      Connect wallet
    </button>
  );
};

function AppWrapper({children}) {
  const authOptions = useConnectAuthOptions();
  return <Connect authOptions={authOptions}>{children}</Connect>;
}

function App() {
  return (
    <AppWrapper>
      <ConnectWalletButton />
    </AppWrapper>
  );
}

export default App;
