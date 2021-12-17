import { useEffect, useState } from "react";
import { connect } from "react-redux";
import VideoRecorder from "react-video-recorder";

import CameraActions from '../components/CameraActions';

function ChallengeUpload({ header }) {
  const [videoBlob, setVideoBlob] = useState(null);

  // hides header for page
  useEffect(() => {
    header.setIsShowing(false);
    return () => header.setIsShowing(true);
  }, []);

  function uploadVideo() {
    console.log('Upload video: ', videoBlob);
  }

  return (
    <div style={{ position: 'fixed', height: "100%", width: "100%" }}>
      <VideoRecorder
        onRecordingComplete={videoBlob => setVideoBlob(videoBlob)}
        renderActions={(props) => <CameraActions onUploadVideo={uploadVideo} {...props} />}
      />
    </div>
  );
}


const mapState = () => ({});

const mapDispatch = ({ header }) => ({ header });

const ConnectedChallengeUpload = connect(mapState, mapDispatch)(ChallengeUpload);

export { ConnectedChallengeUpload as ChallengeUpload };