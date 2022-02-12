import React from 'react';
import commonStyles from '../styles/common.module.css';
import Container from '@mui/material/Container';

import { useSelector } from 'react-redux';


export default function Home() {
  const profile = useSelector(state => state.firebase.profile);
  return (
    <Container className={commonStyles.ContainerLoading}> 
    </Container>
  );
}
