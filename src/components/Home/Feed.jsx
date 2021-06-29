import React from 'react';
import {Container} from '@material-ui/core';
import {useGetJifTransactionsQuery} from 'store/api';
import FeedItem from './FeedItem';

function Feed() {
  const {data} = useGetJifTransactionsQuery();
  return (
    <Container maxWidth="xs">
      {data?.map(item => (
        <FeedItem key={item.index} {...item} />
      ))}
    </Container>
  );
}

export default Feed;
