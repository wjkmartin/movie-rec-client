import { useState } from 'react';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import useSWR from 'swr';
import ProvidersList from './ProvidersList/ProvidersList';

export default function WatchPopup({ open, setOpen, movieData }) {
  const TEMP_PROVIDER_REGION = "CA";
  const { data, error } = useSWR(`/api/providers/${movieData.id}`, (url) =>
    fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => res)
      .catch((err) => console.log(err))
  );
  if (data) {
    return (
      <Dialog
        maxWidth="lg"
        fullwidth="true"
        onClose={() => setOpen(false)}
        open={open}
      >
        <DialogTitle><Typography variant='h4'>{movieData.title}</Typography><Typography variant='subtitle1'>Content providers:</Typography></DialogTitle>
        <DialogContent>
          <DialogContentText>
            
            <Typography variant="h6">
              {Object.keys(data).length === 0
                ? 'No providers found'
                : <ProvidersList providerData={data[TEMP_PROVIDER_REGION]}/>}
            </Typography>
            <Typography fontSize={10}>
              Attribution: The source of the above information is JustWatch.com
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        maxWidth="lg"
        fullwidth="true"
        onClose={() => setOpen(false)}
        open={open}
      >
        <CircularProgress />
      </Dialog>
    );
  }
}
