import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import userSlice from '../../../slices/userSlice';

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

const UserArea = ({ isSignedIn, auth }) => {
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const loginOptions = '';
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const [loginDialogueVisible, setLoginDialogueVisible] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleModalClick = (selection) => {
    switch (selection) {
      case 'Profile':
        break;
      case 'Account':
        break;
      case 'Dashboard':
        break;
      case 'Logout':
        signOut(auth)
          .then(() => {
            console.log('Signed out');
            dispatch(userSlice.actions.logoutUser());
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
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
          setLoginDialogueVisible={setLoginDialogueVisible}
          open={loginDialogueVisible}
        />
      </>
    );
  }
};

export default UserArea;
