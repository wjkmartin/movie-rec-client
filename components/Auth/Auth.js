import React, { useEffect } from 'react';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import {
  GoogleAuthProvider,
  getAuth,
  User as FirebaseUser,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import authSlice from './authSlice';



function getDocsWithUserID(uid) {
  const db = getFirestore();
  const users = collection(db, 'Users');
  const q = query(users, where('uid', '==', uid));
  return getDocs(q);
}

function getAllUserDocs() {
  const db = getFirestore();
  const users = collection(db, 'Users');
  const q = query(users);
  return getDocs(q);
}

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

function SignInScreen() {
  const dispatch = useDispatch();

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
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  const [user, setUser] = React.useState(FirebaseUser);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  useEffect(() => {
    function setUserIndexIdLocal(userIndex) {
      console.log(userIndex);
      dispatch(authSlice.actions.setUserIndexIdentifier(userIndex));
    }

    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        dispatch(authSlice.actions.setUserID(user.uid));
        dispatch(authSlice.actions.isSignedIn(true));
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
  return isSignedIn ? (
    <div> Signed In as {user?.uid}</div>
  ) : (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
    </div>
  );
}

export default SignInScreen;
