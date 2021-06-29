import React from 'react';
import Video from './Video';

function stopStreamedVideo(videoElem) {
  if (videoElem && videoElem.srcObject) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => {
      track.stop();
    });

    // eslint-disable-next-line no-param-reassign
    videoElem.srcObject = null;
  }
}

const LiveCamera = props => {
  const {constraint, onMediaStreamError, onMediaStream} = props;
  const liveVideoRef = React.useRef(null);

  React.useEffect(() => {
    const video = liveVideoRef.current;
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      window.navigator.mediaDevices
        .getUserMedia(constraint)
        .then(stream => {
          video.srcObject = stream;
          onMediaStream(stream);
        })
        .catch(onMediaStreamError);

      video.onloadedmetadata = function metadata() {
        video.play();
      };
    } else {
      onMediaStreamError(new Error('camera not supported'));
    }
    return () => {
      stopStreamedVideo(video);
    };
  }, [liveVideoRef, constraint, onMediaStreamError, onMediaStream]);

  return <Video className="video" ref={liveVideoRef} autoPlay loop muted playsInline />;
};

export default LiveCamera;
