import { Stack, Typography, alpha, useTheme } from '@mui/material';

interface EnhancedTableToolbarProps {
  numSelected: number;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const theme = useTheme();

  return numSelected > 0 ? (
    <Stack
      sx={{
        p: theme.spacing(1, 2),
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%', p: 0, m: 0 }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} selected
      </Typography>
    </Stack>
  ) : null;
}
