import { useSelector } from 'react-redux';
import styles from './RateButtons.module.css';

import { Button, Typography } from '@mui/material';
import { getFirebase } from 'react-redux-firebase';

export default function RateButtons({ setDidRate, movieId }) {
  const firebase = getFirebase();
  const auth = useSelector((state) => state.firebase.auth);

  function handleRatingClick(rating) {
    firebase.ref(`/users/${auth.uid}/ratingsById/${movieId}`).set(rating);
    firebase.ref(`/users/${auth.uid}/movieRecordConfirmed/${movieId}`).set(true);
    setDidRate(true);
  }

  function handleNotSeenClick() {
    firebase.ref(`/users/${auth.uid}/movieRecordConfirmed/${movieId}`).set(false);
    setDidRate(true);
  }

  return (
    <div className={styles.RateButtons}>
      <div className={styles.rateButtonRow}>
        <Button
          variant="outlined"
          onClick={() => {
            handleRatingClick(5);
          }}
        >
          <Typography>Love it! ⬆</Typography>
        </Button>
      </div>
      <div className={styles.rateButtonRow}>
        <Button
          variant="outlined"
          onClick={() => {
            handleRatingClick(1);
          }}
        >
          <Typography>⬅ Didn&apos;t like it </Typography>
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            handleRatingClick(3);
          }}
        >
          <Typography>Liked it ➡ </Typography>
        </Button>
      </div>
      <div className={styles.rateButtonRow}>
        <Button variant="outlined" onClick={() => {
          handleNotSeenClick();
        }}>
          <Typography>Haven&apos;t seen it yet ⬇ </Typography>
        </Button>
      </div>
    </div>
  );
}
