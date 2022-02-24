import { Stack, Typography, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

export default function ProvidersList({ providerData }) {
  const profile = useSelector((state) => state.firebase.profile);

  return (
    <Box>
      <Stack>
        <Box sx={{mb: 2}}>
          <Typography variant="h5">
            {providerData.buy ? 'Buy' : null}
          </Typography>
          <Stack direction="row" spacing={2}>
            {providerData.buy?.map((provider) => (
              <Typography variant="subtitle1">{provider.provider_name}</Typography>
            ))}
          </Stack>
        </Box>
        <Box sx={{mb: 2}}>
          <Typography variant="h5">
            {providerData.flatrate ? 'Stream (monthly subscription)' : null}
          </Typography>
          <Stack direction="row" spacing={2}>
            {providerData.flatrate?.map((provider) => (
              <Typography variant="subtitle1">{provider.provider_name}</Typography>
            ))}
          </Stack>
        </Box>
        <Box sx={{mb: 2}}>
          <Typography variant="h5">
            {providerData.rent ? 'Rent' : null}
          </Typography>
          <Stack direction="row" spacing={2}>
            {providerData.rent?.map((provider) => (
              <Typography variant="subtitle1">{provider.provider_name}</Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
