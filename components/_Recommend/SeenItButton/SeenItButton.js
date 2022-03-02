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

export default function SeenItButton({ movieId }) {
  const firebase = getFirebase();
  const auth = useSelector((state) => state.firebase.auth);

  const [ratingSelected, setRatingSelected] = useState(null);

  function handleRatingClick(rating) {
    setRatingSelected(rating);
    firebase.ref(`/users/${auth.uid}/ratingsById/${movieId}`).set(rating);
    firebase
      .ref(`/users/${auth.uid}/movieRecordConfirmed/${movieId}`)
      .set(true);
  }

  const RateModal = forwardRef(function RateModal(props, ref) {
    return (
      <Stack ref={ref} direction="row">
        <Button
          onClick={() => {
            handleRatingClick(3);
          }}
        >
          <ThumbUpSharp color={ratingSelected === 3 ? 'primary' : ''} />
        </Button>
        <Button
          onClick={() => {
            handleRatingClick(5);
          }}
        >
          <Favorite color={ratingSelected === 5 ? 'primary' : ''} />
        </Button>
        <Button
          onClick={() => {
            handleRatingClick(1);
          }}
        >
          <ThumbDownSharp color={ratingSelected === 1 ? 'primary' : ''} />
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
