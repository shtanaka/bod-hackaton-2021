import * as React from 'react';
import { useState } from 'react';
import testBackground from '../cat.jpeg'

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import testVideo from '../file_example_WEBM_480_900KB.webm'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


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

export function PickAWinner() {
  
  const [email, setEmail] = useState('');

  const thumbNail = () => {
      return(
        //<div style={{height:'200px',backgroundSize:'100% 100%', backgroundRepeat:'no-repeat', backgroundImage: `url(${testBackground})`}}/>
        <video 
            style={{
                width:'100%', 
                height:'150px',
                objectFit:'cover',
            }} 
            className='videoTag' controls>
            <source src={testVideo} type='video/mp4' />
        </video>
      )
  }

  const returnGrid = () => {
    return (
      <>
        {placeHolderData.map((item, index) => (
          <Grid my={.25} container >
                <Grid onClick={() => console.log('click')} item xs={6}>
                    {thumbNail()}
                </Grid>
                <Grid onClick={() => console.log('click')} item xs={6}>
                    <div style={{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center',justifyContent:'center',padding:'5px', paddingTop:'30px'}} >
                        <p>Video Title</p>

                        <Button 
                            variant="outlined" 
                            href="#outlined-buttons" 
                            onClick={() => console.log('winner')}>
                            Select winner
                        </Button>
                    </div>
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
