import { Container } from '@mui/material';
import { Header } from 'app/pages/Header';
import React from 'react';

export function ProfileNotFoundPage() {
  return (
    <React.Fragment>
      <Header />
      <Container style={{ textAlign: 'center' }}>
        Walang ganyang username men.
      </Container>
    </React.Fragment>
  );
}
