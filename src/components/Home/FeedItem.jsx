import {Typography, Paper, Box, makeStyles} from '@material-ui/core';
import {base64StringToBlob} from 'blob-util';
import GifVideoPlayer from 'components/Post/GifVideoPlayer';
import VideoContainer from 'components/Post/VideoContainer';
import {truncateMiddle} from 'common/utils/stacks-utils';
import React from 'react';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    paddingTop: 5,
    marginBottom: theme.spacing(2),
  },
}));

function FeedItem({content, sender, attachment}) {
  const [gif, setGif] = React.useState(null);
  const classes = useStyles();

  React.useEffect(() => {
    if (attachment && !gif) {
      fetch(attachment)
        .then(res => res.json())
        .then(data =>
          base64StringToBlob(data.base64Video, {
            type: data.type,
          })
        )
        .then(blob => setGif(blob));
    }
  }, [attachment, gif]);

  return (
    <Paper className={classes.paper}>
      <Box my={2}>
        <Typography>{truncateMiddle(sender)}</Typography>
      </Box>
      {Boolean(gif) && (
        <VideoContainer>
          {' '}
          <GifVideoPlayer gif={gif} />{' '}
        </VideoContainer>
      )}
      <Typography>{content}</Typography>
    </Paper>
  );
}

export default FeedItem;
