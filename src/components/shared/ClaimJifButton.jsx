import {Button, CircularProgress} from '@material-ui/core';
import {useConnect} from '@stacks/connect-react';
import {principalCV} from '@stacks/transactions/dist/clarity/types/principalCV';
import {JIF_CHAT_CONTRACT, REQUEST_FUNCTION} from 'common/constants';
import {useCurrentAddress} from 'common/hooks/useCurrentAddress';
import {useJifBalance} from 'common/hooks/useJifBalance';
import {testNetwork} from 'common/stacks';
import React from 'react';
import {useDispatch} from 'react-redux';
import api from 'store/api';

function ClaimJifButton() {
  const address = useCurrentAddress();
  const dispatch = useDispatch();
  const balance = useJifBalance();
  const hasBalance = Boolean(parseInt(balance ?? 0, 10));
  const [isLoading, setIsLoading] = React.useState(false);
  const {doContractCall} = useConnect();
  const [contractAddress, contractName] = JIF_CHAT_CONTRACT.split('.');
  const network = testNetwork;

  const onFinish = () => {
    setIsLoading(false);
    dispatch(
      api.endpoints.getJifBalance.initiate(address, {
        forceRefetch: true,
      })
    );
  };

  const onCancel = () => {
    setIsLoading(false);
  };

  const callback = () => {
    setIsLoading(true);
    doContractCall({
      contractAddress,
      contractName,
      functionName: REQUEST_FUNCTION,
      functionArgs: [principalCV(address)],
      onFinish,
      onCancel,
      network,
      stxAddress: address,
    });
  };
  return (
    <Button
      onClick={callback}
      endIcon={isLoading ? <CircularProgress size="1rem" /> : undefined}
      disabled={isLoading || hasBalance}
    >
      Claim Jif Token
    </Button>
  );
}

export default ClaimJifButton;
