import { CircularProgress, Stack, SxProps, alpha, useTheme } from '@mui/material';
import React from 'react';

interface FullWidhtLoaderProps {
  sx?: SxProps;
}
const FullWidhtLoader: React.FC<FullWidhtLoaderProps> = ({ sx }) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: alpha(theme.palette.primary.main, 0.2),
        zIndex: 9999,
        ...sx,
      }}
    >
      <CircularProgress size={55} color="primary" />
    </Stack>
  );
};

export default FullWidhtLoader;
