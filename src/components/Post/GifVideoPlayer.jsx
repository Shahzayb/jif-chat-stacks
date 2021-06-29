import React from 'react';
import Video from './Video';

const GifVideoPlayer = ({gif}) => {
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    const video = videoRef.current;
    const videoURL = window.URL.createObjectURL(gif);
    video.src = videoURL;
    return () => {
      window.URL.revokeObjectURL(videoURL);
    };
  }, [gif, videoRef]);

  return <Video className="video" ref={videoRef} autoPlay loop muted playsInline />;
};

export default GifVideoPlayer;
