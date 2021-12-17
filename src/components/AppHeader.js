import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AppDialog } from './AppDialog';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  signInUser,
  createUser,
  signOutUser,
} from '../services/firebase';
import { useState } from 'react';
import { useMutation } from 'react-query';

export function AppHeader() {
  const [user] = useAuthState(auth);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useMutation(() => signInUser(email, password));
  const signUp = useMutation(() => createUser(email, password));
  const signOut = useMutation(() => signOutUser());

  console.log(user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Another Todo App
          </Typography>
          {!user ? (
            <Button color="inherit" onClick={() => setLoginOpen(true)}>
              Sign In
            </Button>
          ) : (
            <Button color="inherit" onClick={() => signOut.mutate()}>
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <AppDialog
        open={loginOpen || signUpOpen}
        title={loginOpen ? 'Login' : 'Sign Up'}
        onClose={() => (loginOpen ? setLoginOpen(false) : setSignUpOpen(false))}
      >
        <Box mb={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box>
          <Button
            variant="outlined"
            disabled={!email || !password}
            onClick={() => signIn.mutate(email, password)}
          >
            Login
          </Button>
        </Box>
      </AppDialog>
    </Box>
  );
}
