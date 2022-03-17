import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react';

import { useDispatch } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { useFirebase } from 'react-redux-firebase';

const LoginBlock = ({ onClose, open }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/signedIn',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        handleSignIn(authResult);
        return false;
      },
    },
  };

  const handleClose = () => {
    onClose(false);
  };

  async function handleSignIn(_authResult) {
    const uid = _authResult.user.uid;
    firebase
      .database()
      .ref(`users/${uid}`)
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          // user login as per normal
        } else {
          // new user
          firebase
            .database()
            .ref('users/count')
            .once('value', (snapshot) => {
              const count = snapshot.val();
              firebase
                .database()
                .ref(`users/${uid}`)
                .set({
                  id: count + 1,
                  name: _authResult.user.displayName,
                  email: _authResult.user.email,
                  yob: 1990,
                  gender: 1,
                  region: 'dadad',
                  needToRegenRecs: true,
                  savedMoviesById: [],
                  movieRatings: [],
                });
            });
          firebase
            .database()
            .ref('users/count')
            .once('value', (snapshot) => {
              const count = snapshot.val();
              firebase
                .database()
                .ref('users/count')
                .set(count + 1);
            });
        }
      });
  }

  return (
    <Dialog sx={{position: 'absolute'}} open={open} onClose={handleClose}>
      <DialogTitle>Choose login method</DialogTitle>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Dialog>
  );
};

export default LoginBlock;
