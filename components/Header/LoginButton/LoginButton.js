import React from 'react';
import Button from '@mui/material/Button';

const LoginButton = ({ loginDialogueVisible, setLoginDialogueVisible }) => {
  const handleButtonClick = () => {
    console.log('handleButtonClick');
    setLoginDialogueVisible(!loginDialogueVisible);
  };

  return (
    <Button onClick={setLoginDialogueVisible} variant="outlined">
      Login
    </Button>
  );
};

export default LoginButton;
