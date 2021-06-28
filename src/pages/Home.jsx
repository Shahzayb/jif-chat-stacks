import React from 'react';
import ConnectWalletButton from 'components/ConnectWalletButton';
import AccountName from 'components/AccountName';
import SignOutButton from 'components/SignOutButton';
import Layout from 'components/shared/Layout';
import {useUser} from 'common/hooks/useUser';

function ShowUser() {
  const user = useUser();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

function Home() {
  return (
    <Layout>
      <ConnectWalletButton />
      <SignOutButton />
      <ShowUser />
      <AccountName />
    </Layout>
  );
}

export default Home;
