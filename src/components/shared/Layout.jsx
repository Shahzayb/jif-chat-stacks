import {styled} from '@material-ui/core';
import React from 'react';
import Navbar from './Navbar';

const MB = styled('div')({
  marginBottom: '5rem',
});

function Layout({children}) {
  return (
    <>
      <MB>
        <Navbar />
      </MB>
      {children}
    </>
  );
}

export default Layout;
