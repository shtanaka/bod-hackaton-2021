import * as React from 'react';
import { useState } from 'react';

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
} from '../services/firebase';

import { useParams } from "react-router-dom";

import testBackground from '../cat.jpeg'
import testVideo from '../file_example_WEBM_480_900KB.webm'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
  borderRadius: '10px'
};

const placeHolderData = [
  { a: 'a' },
  { a: 'b' },
  { a: 'c' },
  { a: 'a' },
  { a: 'b' },
  { a: 'c' },
  { a: 'a' },
  { a: 'b' },
  { a: 'c' },
  { a: 'a' },
  { a: 'b' },
  { a: 'c' },
]

export function VideoPage() {
  const { challengeId } = useParams();
  const [challenge] = useDocument(references.challenge(challengeId));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const thumbNail = (item) => {
    return (
      <>

        <Button onClick={() => console.log('click')} style={{ color: 'white', marginLeft: '5px', transform: 'translate(0%, 90%)', fontSize: '20px', zIndex: '100' }}>Video Title</Button>
        <video
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          className='videoTag' controls>
          <source src={testVideo} type='video/mp4' />
        </video>
      </>
    )
  }

  const returnGrid = (arrayOfVideos) => {
    return (
      <>
        {arrayOfVideos.map((item, index) => (
          thumbNail(item)
        ))}
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
              transform: 'translate(-50%, -50%)'
            }}
            className='videoTag' controls>
            <source src={challenge.data().mediaURL} type='video/mp4' />
          </video>
          <Button
            style={{ position: 'fixed', bottom: '30px', right: '40%' }}
            variant="outlined"
            href="#outlined-buttons"
            onClick={() => handleOpen()}>
            Do Stuff
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                test test test
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                test test test
              </Typography>
              <Paper style={{ maxHeight: '80%', overflow: 'auto' }}>
                {returnGrid(placeHolderData)}
              </Paper>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
