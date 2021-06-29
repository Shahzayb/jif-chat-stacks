import React from 'react';
import Layout from 'components/shared/Layout';
import Feed from 'components/Home/Feed';
import {Container} from '@material-ui/core';

function Home() {
  return (
    <Layout>
      <Container>
        <Feed />
      </Container>
    </Layout>
  );
}

export default Home;
