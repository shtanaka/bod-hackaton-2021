import * as React from 'react';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import EmptyStarIcon from '@mui/icons-material/StarOutline';
import HeartIcon from '@mui/icons-material/HeartBroken';
import EmptyHeartIcon from '@mui/icons-material/HeartBrokenOutlined';

import {
  useCollection,
  useDocument,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import {
  auth,
  references,
  createChallenge,
  createShot,
  likeShot,
} from '../services/firebase';

import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAuthState } from 'react-firebase-hooks/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '80%',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

export function VideoPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { challengeId } = useParams();
  const [challenge] = useDocument(references.challenge(challengeId));
  const [shots] = useCollection(references.shots(challengeId));

  const isVideoMine = () => challenge.data().challenger.userId === user.uid;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const likeAShot = async () => {
    await likeShot(challengeId);
  };

  const thumbNail = (shot) => {
    return (
      <>
        <Button
          onClick={() => console.log('click')}
          style={{
            color: 'white',
            marginLeft: '5px',
            transform: 'translate(0%, 90%)',
            fontSize: '20px',
            zIndex: '100',
          }}
        >
          {shot.title}
        </Button>
        <video
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
          }}
          src={shot.mediaURL}
          className="videoTag"
          controls
        ></video>
      </>
    );
  };

  const returnGrid = (arrayOfVideos) => {
    return (
      <>
        {arrayOfVideos?.docs.map((shotDoc) => {
          const shot = shotDoc.data();
          return thumbNail(shot);
        })}
        <Box display="flex" justifyContent="space-between" padding={2}>
          <StarIcon />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            10 &nbsp;&nbsp; <HeartIcon onClick={() => likeAShot()} />
          </div>
        </Box>
      </>
    );
  };

  return (
    <>
      {challenge && (
        <div style={{ height: '100%', width: '100%' }}>
          <video
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className="videoTag"
            autoPlay
            loop
          >
            <source src={challenge.data().mediaURL} type="video/mp4" />
          </video>
          <Button
            style={{ position: 'fixed', bottom: '30px', right: '40%' }}
            variant="contained"
            onClick={() => handleOpen()}
          >
            Shots
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Shots
              </Typography>
              <Paper style={{ maxHeight: '80%', overflow: 'auto' }}>
                {returnGrid(shots)}
              </Paper>
            </Box>
          </Modal>
        </div>
      )}
      {user && (
        <Box position="fixed" top="1em" right="1em">
          <Link to={`/shot-upload/${challengeId}`}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </Box>
      )}
      <Box position="fixed" top="1em" left="1em">
        <Fab onClick={() => navigate(-1)} color="secondary" aria-label="add">
          <CancelIcon />
        </Fab>
      </Box>
    </>
  );
}
