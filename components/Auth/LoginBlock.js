import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import userSlice from '../../slices/userSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';

import { getAllUserDocs, getDocsWithUserID } from './firestoreHelpers';
import { setDoc, getFirestore, doc } from 'firebase/firestore';


const LoginBlock = ({ onClose, open, setLoginDialogueVisible }) => {
  const dispatch = useDispatch();
  const db = getFirestore();
  const auth = getAuth();

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      TwitterAuthProvider.PROVIDER_ID,
    ],
  };
    

  async function assignNewUserToCollection(uid, cb) {
    getAllUserDocs().then((snapshot) => {
      const newUserIndex = snapshot.docs.length + 1;
      const user = {
        userIndex: newUserIndex,
        uid: uid,
        age: '',
        gender: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        savedMoviesById: [],
      };
      console.log(snapshot.docs.length);
      setDoc(doc(db, 'Users', String(newUserIndex)), user);
      cb(newUserIndex);
    });
  }

  function setUserIndexIdLocal(userIndex) {
    dispatch(userSlice.actions.setUserIndexIdentifier(userIndex));
  }

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    dispatch(userSlice.actions.setUserID(user.uid));
    dispatch(userSlice.actions.isSignedIn(true));
    getDocsWithUserID(user.uid).then((snapshot) => {
      if (snapshot.docs.length === 0) {
        assignNewUserToCollection(user.uid, setUserIndexIdLocal);
      } else {
        setUserIndexIdLocal(snapshot.docs[0].data().userIndex);
      }
    });

    return;
  });

  return (
    <Dialog open={Boolean(open)}>
      <DialogTitle>Choose login method</DialogTitle>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </Dialog>
  );
};

export default LoginBlock;
