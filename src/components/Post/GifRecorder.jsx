import React from 'react';
import {FiCameraOff} from 'react-icons/fi';
import {MdCancel} from 'react-icons/md';
import {RiCameraSwitchLine, RiRecordCircleLine} from 'react-icons/ri';
import {styled, Typography, IconButton, makeStyles} from '@material-ui/core';
import LiveCamera from './LiveCamera';
import GifVideoPlayer from './GifVideoPlayer';
import VideoContainer from './VideoContainer';

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.common.black,
  },
  recordingButton: {
    color: theme.palette.error.main,
    // '&:disabled': {

    // }
  },
  controlsContainer: {
    paddingBlock: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const ErrorContainer = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.error.main,
  '& > * + *': {
    marginTop: theme.spacing(1),
  },
}));

const CameraContainer = styled('div')(({theme}) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '5px',
}));

const AbsoluteCenter = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

function GifRecorder({gifVideo, setGifVideo, disabled = false, required}) {
  const classes = useStyles();
  const [isOff, setOff] = React.useState(false);
  const [isSupported, setSupported] = React.useState(true);
  const [isFront, setFront] = React.useState(true);
  const [recording, setRecording] = React.useState(false);
  const [recorder, setRecorder] = React.useState(null);

  const isError = !disabled && required && !gifVideo;

  const constraint = React.useMemo(
    () => ({
      audio: false,
      video: {
        facingMode: isFront ? 'user' : 'environment',

        width: {min: 640, ideal: 1920, max: 1920},
        height: {min: 400, ideal: 1080},
      },
    }),
    [isFront]
  );

  const streamMediaHandler = React.useCallback(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    setRecorder(mediaRecorder);
    setOff(false);
    setSupported(true);
  }, []);

  const streamMediaErrorHandler = React.useCallback(e => {
    if (e.name === 'NotAllowedError') {
      setOff(true);
    } else {
      setSupported(false);
    }
  }, []);

  const recordHandler = React.useCallback(() => {
    setRecording(true);
    const chunks = [];
    recorder.start();
    setTimeout(() => {
      recorder.stop();
    }, 1800);

    recorder.ondataavailable = function dataAvailable(ev) {
      chunks.push(ev.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, {type: 'video/mp4;'});

      setGifVideo(blob);

      setRecording(false);
      setRecorder(null);
    };
  }, [recorder, setGifVideo]);

  const toggleCamera = React.useCallback(() => {
    setFront(!isFront);
  }, [isFront]);

  const clearGifVideo = React.useCallback(() => {
    setGifVideo(null);
  }, [setGifVideo]);

  return (
    <div>
      <CameraContainer>
        {!gifVideo && (
          <VideoContainer>
            <LiveCamera
              constraint={constraint}
              onMediaStream={streamMediaHandler}
              onMediaStreamError={streamMediaErrorHandler}
            />
          </VideoContainer>
        )}
        {gifVideo && (
          <VideoContainer>
            <GifVideoPlayer gif={gifVideo} />
          </VideoContainer>
        )}
        {isOff && (
          <AbsoluteCenter>
            <ErrorContainer>
              <FiCameraOff fontSize="1.5rem" />
              <Typography>camera is off</Typography>
            </ErrorContainer>
          </AbsoluteCenter>
        )}
        {!isSupported && (
          <AbsoluteCenter>
            <Typography color="error">
              {isFront ? 'front' : 'back'} camera is not supported
            </Typography>
          </AbsoluteCenter>
        )}
      </CameraContainer>

      <div className={classes.controlsContainer}>
        <IconButton
          className={classes.button}
          size="small"
          disabled={!gifVideo || recording || !isSupported || isOff || disabled}
          onClick={clearGifVideo}
        >
          <MdCancel />
        </IconButton>
        <IconButton
          className={classes.recordingButton}
          size="small"
          disabled={!recorder || recording || gifVideo || !isSupported || isOff || disabled}
          onClick={recordHandler}
        >
          <RiRecordCircleLine fontSize="3rem" />
        </IconButton>

        <IconButton
          className={classes.button}
          size="small"
          onClick={toggleCamera}
          disabled={disabled}
        >
          <RiCameraSwitchLine />
        </IconButton>
      </div>
      {isError && (
        <div>
          <span>*</span> <span>gif required</span>
        </div>
      )}
    </div>
  );
}

export default GifRecorder;
