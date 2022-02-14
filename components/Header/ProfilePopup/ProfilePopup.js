import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  MenuItem,
  Stack,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';

export const ProfilePopup = ({ open, setProfileDialogueVisible }) => {
  const profile = useSelector((state) => state.firebase.profile);
  const [gender, setGender] = useState(profile.gender);
  const [age, setAge] = useState(2022 - profile.yob);
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const genders = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
  ];

  return (
    <Dialog open={Boolean(open)}>
      <DialogTitle>Profile</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <Stack sx={{ marginTop: 1 }} spacing={2}>
            <TextField label="Year of birth" />
            <TextField
              select
              defaultValue={gender}
              value={gender}
              onChange={handleChange}
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
                setProfileDialogueVisible(false);
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
