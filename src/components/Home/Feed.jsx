import React from 'react';
import {Container} from '@material-ui/core';
import {useFeed} from 'common/hooks/useFeed';
import FeedItem from './FeedItem';

function Feed() {
  const data = useFeed();
  return (
    <Container maxWidth="xs">
      {data?.map(item => (
        <FeedItem key={item.id} {...item} />
      ))}
    </Container>
  );
}

export default Feed;
