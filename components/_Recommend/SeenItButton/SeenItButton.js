import { forwardRef, useState } from 'react';
import {
  Favorite,
  ThumbDownSharp,
  ThumbUpSharp,
  Visibility,
} from '@mui/icons-material';
import { Button, Stack, Typography, Tooltip } from '@mui/material';
import { getFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

export default function SeenItButton({ movieId, setDidRate }) {
  const firebase = getFirebase();
  const auth = useSelector((state) => state.firebase.auth);

  function handleRatingClick(rating) {
    firebase.ref(`/users/${auth.uid}/ratingsById/${movieId}`).set(rating);
    firebase
      .ref(`/users/${auth.uid}/movieRecordConfirmed/${movieId}`)
      .set(true);
    setDidRate(true);
    console.log('rated on rec page')
  }

  const RateModal = forwardRef(function RateModal(props, ref) {
    return (
      <Stack ref={ref} direction="row">
        <Button
          onClick={() => {
            handleRatingClick(3);
          }}
        >
          <ThumbUpSharp />
        </Button>
        <Button
          onClick={() => {
            handleRatingClick(5);
          }}
        >
          <Favorite />
        </Button>
        <Button
          onClick={() => {
            handleRatingClick(1);
          }}
        >
          <ThumbDownSharp  />
        </Button>
      </Stack>
    );
  });

  const button = (
    <Button variant="outline">
      <Stack spacing={1} direction="row">
        <Visibility />
        <Typography> Seen it!</Typography>
      </Stack>
    </Button>
  );

  return (
    <>
      <Tooltip arrow title={<RateModal />}>
        {button}
      </Tooltip>
    </>
  );
}
