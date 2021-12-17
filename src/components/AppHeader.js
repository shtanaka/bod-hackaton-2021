import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
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
  const [dialogTitle, setDialogTitle] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const signInOrSignUp = useMutation(async () => {
    return loginOpen
      ? signInUser(email, password)
      : createUser(email, password, displayName);
  });
  // const signUp = useMutation(() => createUser(email, password));
  const signOut = useMutation(() => signOutUser());

  console.log([user, signInOrSignUp.error]);

  React.useEffect(() => {
    if (user) {
      if (loginOpen) setLoginOpen(false);
      if (signUpOpen) setSignUpOpen(false);
    }

    if (loginOpen) setDialogTitle('Login');
    else if (signUpOpen) setDialogTitle('Register');
  }, [user, loginOpen, signUpOpen]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BODChallenges
          </Typography>
          {!user ? (
            <>
              <Box mr={2}>
                <Button color="inherit" onClick={() => setLoginOpen(true)}>
                  Login
                </Button>
              </Box>
              <Box>
                <Button color="inherit" onClick={() => setSignUpOpen(true)}>
                  Register
                </Button>
              </Box>
            </>
          ) : (
            <Button color="inherit" onClick={() => signOut.mutate()}>
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <AppDialog
        open={loginOpen || signUpOpen}
        title={dialogTitle}
        onClose={() => {
          setLoginOpen(false);
          setSignUpOpen(false);
        }}
      >
        {signUpOpen && (
          <Box my={2}>
            <TextField
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
            />
          </Box>
        )}
        <Box my={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mb={2} display="flex">
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </Box>
        <Box>
          <Button
            variant="outlined"
            disabled={!email || !password}
            onClick={() => signInOrSignUp.mutate(email, password)}
          >
            {dialogTitle}
          </Button>
        </Box>
        {signInOrSignUp.error && (
          <Box mt={2}>
            {signInOrSignUp.error && (
              <Alert severity="error">{signInOrSignUp.error.message}</Alert>
            )}
          </Box>
        )}
      </AppDialog>
    </Box>
  );
}
