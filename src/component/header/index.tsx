'use client';
import { useCoinDataContext } from '@/context/coinDataContext';
import { CoinDataProps } from '@/interface';
import theme from '@/theme';
import { Add, CloudDownloadOutlined, Delete, FilterList, Search } from '@mui/icons-material';
import {
  Button,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  alpha,
  debounce,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const DashboardHeader = () => {
  const [userInput, setUserInput] = useState('');
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { setFilteredCoinData, coinData } = useCoinDataContext();

  const linearSearch = (coinsData: CoinDataProps[], query: string) => {
    return coinsData.filter(
      (_coin) =>
        _coin?.name?.toLowerCase().includes(query?.toLowerCase()) ||
        _coin?.id?.toLowerCase().includes(query?.toLowerCase())
    );
  };

  const debounceSetUserInput = debounce(setUserInput, 500);

  useEffect(() => {
    if (userInput) {
      const _filteredCoinData = linearSearch(coinData, userInput);
      setFilteredCoinData(_filteredCoinData);
    }
  }, [userInput]);

  return (
    <Stack
      direction={mdDown ? 'column' : 'row'}
      sx={{ p: 2, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
    >
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Typography variant="h5">CoinLore</Typography>
        <Typography variant="caption" sx={{ color: theme.palette.primary.light }}>
          coincurrency
        </Typography>
        <OutlinedInput
          sx={{
            width: {
              sx: 100,
              md: 300,
              lg: 500,
            },
            height: 33,
            boxShadow: theme.shadows[1],
            borderRadius: theme.spacing(1),
            borderColor: alpha(theme.palette.common.black, 0.1),

            outline: 'none',
          }}
          onChange={(e) => debounceSetUserInput(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Search fontSize="small" />
            </InputAdornment>
          }
        />
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          gap: {
            sm: 1,
            md: 2,
          },
        }}
      >
        <Button
          startIcon={<Delete fontSize="small" />}
          sx={{ textTransform: 'unset', color: alpha(theme.palette.common.black, 0.7) }}
        >
          Delete
        </Button>
        <Button
          startIcon={<FilterList fontSize="small" />}
          sx={{ textTransform: 'unset', color: alpha(theme.palette.common.black, 0.7) }}
        >
          Filters
        </Button>
        <Button
          variant="outlined"
          startIcon={<CloudDownloadOutlined fontSize="small" />}
          sx={{
            textTransform: 'unset',
            color: alpha(theme.palette.common.black, 0.7),
            borderColor: alpha(theme.palette.common.black, 0.1),
          }}
        >
          export
        </Button>
        <Button
          variant="contained"
          startIcon={<Add fontSize="small" />}
          sx={{
            textTransform: 'unset',
            borderRadius: theme.spacing(1),
          }}
        >
          New CTA
        </Button>
      </Stack>
    </Stack>
  );
};

export default DashboardHeader;
