import * as React from 'react';
import { useState } from 'react';
import testBackground from '../cat.jpeg'

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const placeHolderData = [
    {a:'a'},
    {a:'b'},
    {a:'c'},
    {a:'a'},
    {a:'b'},
    {a:'c'},
    {a:'a'},
    {a:'b'},
    {a:'c'},
    {a:'a'},
    {a:'b'},
    {a:'c'},
]

export function Main() {
  
  const [email, setEmail] = useState('');

  const thumbNail = () => {
      return(
        <div style={{height:'150px',backgroundSize:'100% 100%', backgroundRepeat:'no-repeat', backgroundImage: `url(${testBackground})`}}/>
      )
  }

  const returnGrid = () => {
    return (
      <>
        {placeHolderData.map((item, index) => (
          <Grid my={.25} container spacing={.5}>
                <Grid onClick={() => console.log('click')} item xs={4}>
                    {thumbNail()}
                </Grid>
                <Grid onClick={() => console.log('click')} item xs={4}>
                    {thumbNail()}
                </Grid>
                <Grid onClick={() => console.log('click')} item xs={4}>
                    {thumbNail()}
                </Grid>
           </Grid>
        ))}
      </>
    );
  };

  return (
    <>
        {returnGrid()}
    </>
  );
}
