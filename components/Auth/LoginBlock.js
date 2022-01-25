import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import userSlice from '../../slices/userSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
  User,
} from 'firebase/auth';

import { getAllUserDocs, getDocsWithUserID } from './firestoreHelpers';

const LoginBlock = ({onClose, open, setLoginDialogueVisible}) => {
  const dispatch = useDispatch();
  
  const [user, setUser] = useState(User);

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
    const db = getFirestore();
    const users = collection(db, 'Users');
    getAllUserDocs().then((snapshot) => {
      const user = {
        userIndex: snapshot.docs.length + 1,
        uid: uid,
        age: '',
        gender: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addDoc(users, user);
      cb(snapshot.docs.length + 1);
    });
  }

  useEffect(() => {
    function setUserIndexIdLocal(userIndex) {
      dispatch(userSlice.actions.setUserIndexIdentifier(userIndex));
    }

    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
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
      }
    });
  }, [dispatch]);

  return (
 
    <Dialog open={open}>
      <DialogTitle>Choose login method</DialogTitle>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </Dialog>
  );
};

export default LoginBlock;
