import {userSession} from 'common/stacks';
import React from 'react';

function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => {
        userSession?.signUserOut?.();
      }}
    >
      Signout
    </button>
  );
}

export default SignOutButton;
