import { useEffect, useState } from "react";
import { connect } from "react-redux";
import VideoRecorder from "react-video-recorder";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { createChallenge, auth, references } from "../services/firebase";
import CameraActions from '../components/CameraActions';

function ChallengeUpload({ header }) {
  const [user] = useAuthState(auth);
  const [userProfile] = useDocumentData(references.user(user?.uid));
  const [videoBlob, setVideoBlob] = useState(null);

  // hides header for page
  useEffect(() => {
    header.setIsShowing(false);
    return () => header.setIsShowing(true);
  }, []);

  async function uploadVideo() {
    const response = await createChallenge({
      title: 'Test first upload',
      challenger: {
        userId: user?.uid,
        displayName: userProfile?.displayName,
        photoURL: userProfile?.photoURL,
      },
    }, videoBlob);

    console.log(response);
  }

  function goBackToChallenge() {
    console.log('GO BACK TO CHALLENGE');
  }

  return (
    <div style={{ position: 'fixed', height: "100%", width: "100%" }}>
      <VideoRecorder
        onRecordingComplete={videoBlob => setVideoBlob(videoBlob)}
        renderActions={(props) => <CameraActions onUploadVideo={uploadVideo} onCancelClick={goBackToChallenge} {...props} />}
      />
    </div>
  );
}


const mapState = () => ({});

const mapDispatch = ({ header }) => ({ header });

const ConnectedChallengeUpload = connect(mapState, mapDispatch)(ChallengeUpload);

export { ConnectedChallengeUpload as ChallengeUpload };