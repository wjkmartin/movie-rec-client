import React, { useEffect } from 'react';

import firebase from 'firebase/compat/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/compat/auth';

import { useDispatch, useSelector } from 'react-redux';
import authSlice from './authSlice';

const CLIENT_CONFIG = {
  apiKey: 'AIzaSyDfS2WUx_2jPyMQ7Q6_5t9_aFWpKRITzfA',
  authDomain: 'movieapp-38e91.firebaseapp.com',
  projectId: 'movieapp-38e91',
  storageBucket: 'movieapp-38e91.appspot.com',
  messagingSenderId: '635062094244',
  appId: '1:635062094244:web:b036adf7cf1f09ec6dd931',
  databaseURL: 'https://movieapp-38e91-default-rtdb.firebaseio.com/',
  measurementId: 'G-HX65N7087E',
};
firebase.initializeApp(CLIENT_CONFIG);

function SignInScreen() {
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
  const [user, setUser] = React.useState(firebase.User);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();
  useEffect(() => {
     firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        // const token =  user.getIdToken();
        setUser(user);
        dispatch(authSlice.actions.setUserID(user.multiFactor.user.uid));
        dispatch(authSlice.actions.isSignedIn(true));
      } else {
        setUser(null);
        return;
      }

    });
  }, [dispatch]);
  return isSignedIn ? (
    <div> Signed In </div>
  ) : (
    <div>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
}

export default SignInScreen;
