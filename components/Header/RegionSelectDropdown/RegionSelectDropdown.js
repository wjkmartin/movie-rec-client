import { FormControl, MenuItem, Select } from '@mui/material';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFirebase, isLoaded } from 'react-redux-firebase';

export default function RegionSelectDropdown() {
  const FLAG_LIST = ['US', 'CA', 'MX', 'AU', 'NZ', 'GB', 'FR', 'DE', 'IT', 'ES', 'BR'];

  const regionProfile =
    useSelector((state) => state.firebase.profile.region) || '';
  const [region, setRegion] = useState(regionProfile);

  const firebase = getFirebase();

  const handleChange = (event) => {
    setRegion(event.target.value);
    firebase.updateProfile({ region: event.target.value });
  };

  useEffect(() => {
    // we need this becuase the profile is not loaded when the component is first rendered
    setRegion(regionProfile);
  }, [regionProfile]);

  return (
    <FormControl sx={{ mr: 2 }} variant="outlined">
      <Select id="region-select" value={region} onChange={handleChange}>
        {FLAG_LIST.map((flag) => (
          <MenuItem key={flag} value={flag}>
            <Image
              width={20}
              height={13}
              src={`/flags/${flag}.svg`}
              alt={flag}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
