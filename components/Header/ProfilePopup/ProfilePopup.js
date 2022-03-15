import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  MenuItem,
  Stack,
  Button,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { getFirebase } from 'react-redux-firebase';

export const ProfilePopup = ({ open, setProfileDialogueVisible }) => {
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = getFirebase();

  const [yob, setYob] = useState(1990);
  const [gender, setGender] = useState(0);

  useEffect(() => {
    firebase
      .ref(`users/${auth.uid}/yob`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setYob(snapshot.val());
        }
      });

    firebase
      .ref(`users/${auth.uid}/gender`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setGender(snapshot.val());
        }
      });
  }, [auth]);

  const genders = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
  ];

  return (
    <Dialog open={Boolean(open)}>
      <DialogTitle>Profile</DialogTitle>
      <DialogContent>
        <Typography>Hi, {auth.displayName}</Typography>
        <Box component="form" noValidate autoComplete="off">
          <Stack sx={{ marginTop: 1 }} spacing={2}>
            <TextField
              defaultValue={yob}
              value={yob}
              onChange={(e) => setYob(e.target.value)}
              label="Year of birth"
            />
            <TextField
              select
              defaultValue={gender}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
              helperText="Non-binary genders not supported currently due to technical limitations of the model - please choose the one you most identify with or leave default. This is simply to provide better recommendations."
            >
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack spacing={1} direction="row" sx={{ marginTop: 2 }}>
            <Button
              onClick={() => {
                firebase.update(
                  `users/${auth.uid}`,
                  {
                    yob: yob,
                    gender: gender,
                  },
                  setProfileDialogueVisible(false)
                );
              }}
              variant="contained"
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setProfileDialogueVisible(false);
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
