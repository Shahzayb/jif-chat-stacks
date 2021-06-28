import {Button, CircularProgress} from '@material-ui/core';
import {useConnect} from '@stacks/connect-react';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {authLoadingSelector, setAuthLoading} from 'store/auth';

function ConnectWalletButton({endIcon, onClick, children, disabled, ...props}) {
  const {doOpenAuth} = useConnect();
  const dispatch = useDispatch();
  const isLoading = useSelector(authLoadingSelector);

  return (
    <Button
      {...props}
      onClick={() => {
        dispatch(setAuthLoading(true));
        doOpenAuth();
        onClick?.();
      }}
      endIcon={isLoading ? <CircularProgress size="1rem" /> : endIcon}
      disabled={!!(isLoading || disabled)}
    >
      {children ?? `Connect wallet`}
    </Button>
  );
}

export default ConnectWalletButton;
