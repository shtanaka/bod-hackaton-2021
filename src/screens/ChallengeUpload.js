import { useEffect } from "react";
import { connect } from "react-redux";

function ChallengeUpload({ header }) {
  // hides header for page
  useEffect(() => {
    header.setIsShowing(false);
    return () => header.setIsShowing(true);
  }, []);

  return (
    <div>
      
    </div>
  );
}


const mapState = () => ({ });

const mapDispatch = ({ header }) => ({ header });

const ConnectedChallengeUpload = connect(mapState, mapDispatch)(ChallengeUpload);

export { ConnectedChallengeUpload as ChallengeUpload };