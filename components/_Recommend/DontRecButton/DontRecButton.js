import { forwardRef, useState } from 'react';
import {
  Favorite,
  RemoveDone,
  ThumbDownSharp,
  ThumbUpSharp,
  Visibility,
} from '@mui/icons-material';
import { Button, Stack, Typography, Tooltip } from '@mui/material';
import { getFirebase } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

export default function DontRecButton({ movieId }) {
  const firebase = getFirebase();
  const auth = useSelector((state) => state.firebase.auth);


  function handleClick() {
    firebase
      .ref(`/users/${auth.uid}/moviesToNotRecommend`)
      .push(movieId);
  }

  const TooltipDontRec = forwardRef(function TooltipDontRec(props, ref) {
    return (
        <Typography>This won't be shown to you again</Typography>
    );
  });

  const button = (
    <Button onClick={handleClick} variant="outline">
      <Stack spacing={1} direction="row">
        <RemoveDone />
        <Typography> Not interested </Typography>
      </Stack>
    </Button>
  );

  return (
    <>
      <Tooltip arrow title={<TooltipDontRec />}>
        {button}
      </Tooltip>
    </>
  );
}
