import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { signOut } from 'firebase/auth';

import LoginButton from '../LoginButton/LoginButton';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginBlock from '../../Auth/loginBlock';

import { ProfilePopup } from '../ProfilePopup/ProfilePopup';
import FirebaseConnector from './FirebaseConnector/FirebaseConnector';

const UserArea = ({ isSignedIn, auth }) => {
  const settings = ['Profile', 'Logout'];
  const authUser = useSelector((state) => state.firebase.auth);
  

  const [anchorElUser, setAnchorElUser] = useState(null);

  const [loginDialogueVisible, setLoginDialogueVisible] = useState(false);
  const [profileDialogueVisible, setProfileDialogueVisible] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleModalClick = (selection) => {
    switch (selection) {
      case 'Profile':
        setProfileDialogueVisible(true);
        break;
      case 'Logout':
        setLoginDialogueVisible(false);
        signOut(auth)
          .then(() => {
            firebase.auth.logout();
          })
          .catch((error) => {
            // An error happened.
          });
        break;
      default:
        break;
    }
  };

  if (isSignedIn) {
    return (
      <>
      <FirebaseConnector />
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User Avatar" src={authUser.photoURL} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={`menu__${setting}`}
              onClick={() => {
                handleModalClick(setting);
                handleCloseUserMenu();
              }}
            >
              <Typography key={`typo__${setting}`} textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {profileDialogueVisible ? <ProfilePopup open={profileDialogueVisible} setProfileDialogueVisible={setProfileDialogueVisible}/> : null}
      </>
    );
  } else {
    return (
      <>
        <LoginButton
          id="basic-button"
          loginDialogueVisible={loginDialogueVisible}
          setLoginDialogueVisible={setLoginDialogueVisible}
        />
        <LoginBlock
          onClose={setLoginDialogueVisible}
          open={loginDialogueVisible}
        />
      </>
    );
  }
};

export default UserArea;
