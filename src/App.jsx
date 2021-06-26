import React from 'react';
import {Connect} from '@stacks/connect-react';
import AccountName from 'components/AccountName';
import ConnectWalletButton from 'components/ConnectWalletButton';
import SignOutButton from 'components/SignOutButton';
import {useConnectAuthOptions} from 'common/hooks/useConnectAuthOptions';
import {useUser} from 'common/hooks/useUser';

function AppWrapper({children}) {
  const authOptions = useConnectAuthOptions();
  return <Connect authOptions={authOptions}>{children}</Connect>;
}

function ShowUser() {
  const user = useUser();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

function App() {
  return (
    <AppWrapper>
      <ConnectWalletButton />
      <SignOutButton />
      <ShowUser />
      <AccountName />
    </AppWrapper>
  );
}

export default App;
