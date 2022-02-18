import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import userSlice from '../../slices/userSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import {
  useFirebase,
  isLoaded,
  isEmpty,
  firebaseConnect,
} from 'react-redux-firebase';

import { getDatabase, ref, get } from 'firebase/compat/database';

const LoginBlock = ({ onClose, open, setLoginDialogueVisible }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/signedIn',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log('here1');
        handleSignIn(authResult);
        return false;
      },
    },
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
    <Dialog open={Boolean(open)}>
      <DialogTitle>Choose login method</DialogTitle>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Dialog>
  );
};

export default LoginBlock;
