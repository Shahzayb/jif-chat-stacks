import {useConnect} from '@stacks/connect-react';
import React from 'react';

function ConnectWalletButton() {
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
}

export default ConnectWalletButton;
