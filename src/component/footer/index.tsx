import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Stack
      sx={{
        p: 1,
        background: 'transparent',
        position: 'fixed',
        bottom: 0,
        left: 0,
        maxWidth: 200,
        borderRadius: 4,
        backdropFilter: 'blur(15px)',
      }}
    >
      <Typography sx={{ textAlign: 'center', fontSize: 8 }}>
        created by{' '}
        <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          🥂Maxwell Ihiaso⛳️.
        </Box>{' '}
        Copyright @ 2024 Girl-Power Test.
      </Typography>
    </Stack>
  );
};

export default Footer;
