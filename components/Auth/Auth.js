import React, { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { useDispatch, useSelector } from 'react-redux';
import authSlice from './authSlice';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function SignInScreen() {
  // const isSignedIn = firebase.auth().currentUser;
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  console.log('isSignedIn', isSignedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in.');
        console.log(user.multiFactor.user.uid);
        dispatch(authSlice.actions.setUserID(user.multiFactor.user.uid));
        dispatch(authSlice.actions.isSignedIn(true));
      } else {
        console.log('User is signed out.');
      }
    });
  }, []);
  return (
    (isSignedIn ? (
      <div> Signed In </div>
    ) : (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
    ))
  )
}

export default SignInScreen;
