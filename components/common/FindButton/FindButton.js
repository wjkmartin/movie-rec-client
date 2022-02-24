import { AllOut } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

const FindButton = ({ onClick }) => {

  return (
    <Button variant="text" onClick={onClick}>
      <Stack spacing={1} direction="row">
        <AllOut />
        <Typography>FIND</Typography>
      </Stack>
    </Button>
  );
};

export default FindButton;
