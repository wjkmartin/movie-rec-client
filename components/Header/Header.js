import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useSelector } from 'react-redux';

import { getAuth } from 'firebase/auth';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import UserArea from './UserArea/UserArea';

import SvgIcon from '@mui/material/SvgIcon';

import logo from '../../public/logo.svg';
import Image from 'next/image';
import { Stack } from '@mui/material';

const pages = [
  ['Get recs', '/recommend'],
  ['Saved', '/'],
  ['Rate', '/rate'],
];

const Header = () => {
  const auth = getAuth();

  const authLoaded = useSelector((state) => state.firebase.auth.isLoaded);
  const authEmpty = useSelector((state) => state.firebase.auth.isEmpty);
  const isSignedIn = authLoaded && !authEmpty;

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Stack sx={{display: 'flex', alignItems:'center'}} spacing={2} direction='row'>
            <SvgIcon inheritViewBox component={logo} />
            <Typography variant="h6" noWrap color='primary'>
              MovieRec
            </Typography>
            </Stack>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {(isSignedIn ? pages : []).map(([name, href]) => (
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Link href={href}>
                    <Typography textAlign="center">{name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <SvgIcon inheritViewBox component={logo} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {(isSignedIn ? pages : []).map((page) => (
              <Link key={`link__${page[0]}`} href={page[1]}>
                <Button
                  key={`button__${page[0]}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page[0]}
                </Button>
              </Link>
            ))}
          </Box>
          <UserArea isSignedIn={isSignedIn} auth={auth} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
