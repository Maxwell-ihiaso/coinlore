import { CoinDataProps } from '@/interface';
import { CoinDataContextProps } from '@/providers/CoinDataContextProvider';
import React from 'react';

export const coinDataContext = React.createContext<CoinDataContextProps>(
  {} as CoinDataContextProps
);

export const useCoinDataContext = () => {
  const context = React.useContext(coinDataContext);

  if (!context) {
    throw new Error('useCoinDataContext must be used within a CoinDataContextProvider');
  }

  return context;
};
