import * as React from 'react';
import { useState } from 'react';
import testBackground from '../cat.jpeg';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  auth,
  references,
  createChallenge,
  createShot,
} from '../services/firebase';

import { useNavigate } from 'react-router';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import testVideo from '../file_example_WEBM_480_900KB.webm'
import Button from '@mui/material/Button';

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

export function Main() {
  const [challenges] = useCollection(references.challenges);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const goToChallengePage = (challengeId) => navigate(`/challenge/${challengeId}`);

  const thumbNail = (challenge) => {
    const data = challenge.data();
    return (
      <>
        <Button onClick={() => goToChallengePage(challenge.id)} style={{ position: 'absolute', color: 'white', marginLeft: '5px', fontSize: '12px', zIndex: '100' }}>{data.title}</Button>
        <Button onClick={() => goToChallengePage(challenge.id)} style={{ position: 'absolute', color: 'white', marginLeft: '5px', transform: 'translate(0%, 90%)', fontSize: '12px', zIndex: '100' }}>{data.challenger.displayName}</Button>
        {/* <video
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          className='videoTag' controls>
          <source src={challenge.data().mediaURL} type='video/mp4' />
        </video> */}
        <img src={data.challenger.photoURL} type='video/mp4' />
      </>
    )
  }

  const returnGrid = (challenges) => {
    return (
      <>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 2 }}>
          {challenges.map((challenge, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <div>{thumbNail(challenge)}</div>
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <>
      {returnGrid(challenges ? challenges.docs : [] )}
    </>
  );
}
