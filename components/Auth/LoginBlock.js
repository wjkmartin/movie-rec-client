import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import userSlice from '../../slices/userSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

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

  function handleSignIn(_authResult) {
    const uid = _authResult.user.uid;
    const dbRef = ref(getDatabase());
    get(dbRef, 'users/count').then((snapshot) => {
      console.log(snapshot.val());
    }).catch((error) => {
      console.log(error);
    });

    // getDocsWithUserID(uid).then((snapshot) => {
    //   if (snapshot.docs.length === 0) {
    //     assignNewUserToCollection(uid, setUserIndexIdLocal);
    //   } else {
    //     setUserIndexIdLocal(snapshot.docs[0].data().userIndex);
    //   }
    // });
  }

  async function assignNewUserToCollection(uid, cb) {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    console.log(usersRef);
    const newUserIndex = usersRef.length;

    getAllUserDocs().then((snapshot) => {
      const newUserIndex = snapshot.docs.length + 1;
      const user = {
        userIndex: newUserIndex,
        uid: uid,
        age: '',
        gender: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        savedMoviesById: null,
        recommendations: null,
      };
      firebase.updateProfile(user);
      cb(newUserIndex);
    });
  }

  function setUserIndexIdLocal(userIndex) {
    dispatch(userSlice.actions.setUserIndexIdentifier(userIndex));
  }

  return (
    <Dialog open={Boolean(open)}>
      <DialogTitle>Choose login method</DialogTitle>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Dialog>
  );
};

export default LoginBlock;
