import * as React from 'react';
import { useState } from 'react';
import testBackground from '../cat.jpeg';

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
  const [email, setEmail] = useState('');

  const thumbNail = () => {
    return (
      <>
        <Button onClick={() => console.log('click')} style={{ position: 'absolute', color: 'white', marginLeft: '5px', fontSize: '12px', zIndex: '100' }}>Video Title</Button>
        <Button onClick={() => console.log('click')} style={{ position: 'absolute', color: 'white', marginLeft: '5px', transform: 'translate(0%, 90%)', fontSize: '12px', zIndex: '100' }}>Username</Button>
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
          <Grid my={.25} container spacing={.5}>
            <Grid item xs={4}>
              {thumbNail()}
            </Grid>
            <Grid item xs={4}>
              {thumbNail()}
            </Grid>
            <Grid item xs={4}>
              {thumbNail()}
            </Grid>
          </Grid>
        ))}
      </>
    );
  };

  return (
    <>
      {returnGrid(placeHolderData)}
    </>
  );
}
