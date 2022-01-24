import React from 'react';

import Link from 'next/link';
import SignInScreen from '../components/Auth/firestoreHelpers';

import commonStyles from '../styles/common.module.css';

import Container from '@mui/material/Container';
import LoginBlock from '../components/Auth/loginBlock';

export default function Home() {
  return (
    <Container commonStyles={commonStyles.ContainerLoading}> 
      <LoginBlock />
    </Container>
  );
}
