import {Typography, Paper, Box, makeStyles} from '@material-ui/core';
import GifVideoPlayer from 'components/Post/GifVideoPlayer';
import VideoContainer from 'components/Post/VideoContainer';
import {truncateMiddle} from 'common/utils/stacks-utils';
import React from 'react';
import {useGetGifFromGaiaQuery} from 'store/api';
import {base64StringToBlob} from 'blob-util';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    paddingTop: 5,
    marginBottom: theme.spacing(2),
  },
}));

function FeedItem({content, sender, attachment}) {
  const classes = useStyles();

  const {data} = useGetGifFromGaiaQuery(attachment);

  const gif = React.useMemo(() => {
    if (!data) return null;
    const $gif = base64StringToBlob(data.base64Video, {
      type: data.type,
    });
    return $gif;
  }, [data]);

  return (
    <Paper className={classes.paper}>
      <Box my={2}>
        <Typography>{truncateMiddle(sender)}</Typography>
      </Box>
      {Boolean(gif) && (
        <VideoContainer>
          <GifVideoPlayer gif={gif} />
        </VideoContainer>
      )}
      <Typography>{content}</Typography>
    </Paper>
  );
}

export default FeedItem;
