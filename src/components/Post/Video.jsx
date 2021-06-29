const {styled} = require('@material-ui/core');

const Video = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  objectFit: 'cover',
  width: '100%',
  height: '100%',
});

export default Video;
