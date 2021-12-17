import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import testBackground from '../cat.jpeg';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  auth,
  references,
  createChallenge,
  createShot,
} from '../services/firebase';

import { useNavigate } from 'react-router';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export function Main() {
  const [challenges] = useCollection(references.challenges);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const goToChallengePage = (challengeId) =>
    navigate(`/challenge/${challengeId}`);

  const thumbNail = (challenge) => {
    const data = challenge.data();
    return (
      <>
        <Button
          onClick={() => goToChallengePage(challenge.id)}
          style={{
            position: 'absolute',
            color: 'white',
            marginLeft: '5px',
            fontSize: '12px',
            zIndex: '100',
          }}
        >
          {data.title}
        </Button>
        <Button
          onClick={() => goToChallengePage(challenge.id)}
          style={{
            position: 'absolute',
            color: 'white',
            marginLeft: '5px',
            transform: 'translate(0%, 90%)',
            fontSize: '12px',
            zIndex: '100',
          }}
        >
          {data.challenger.displayName}
        </Button>
        <video
          onClick={() => goToChallengePage(challenge.id)}
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          className="videoTag"
        >
          <source src={challenge.data().mediaURL} type="video/mp4" />
        </video>
      </>
    );
  };

  const returnGrid = (challenges) => {
    return (
      <>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 2, md: 3 }}
        >
          {challenges.map((challenge, index) => (
            <Grid item xs={1} key={index}>
              <div>{thumbNail(challenge)}</div>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <>
      {returnGrid(challenges ? challenges.docs : [])}
      <Box position="fixed" bottom="1em" right="1em">
        <Link to="/challenge-upload">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </>
  );
}
