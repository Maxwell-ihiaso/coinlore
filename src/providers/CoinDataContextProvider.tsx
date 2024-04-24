'use client';
import React from 'react';
import { useFetch } from '@/hooks/useFetch';
import { CoinDataApiResponse, CoinDataProps, CoinInfoProps } from '@/interface';
import { coinDataContext } from '@/context/coinDataContext';

export interface CoinDataContextProps {
  coinData: CoinDataProps[];
  setCoinData: React.Dispatch<React.SetStateAction<CoinDataProps[]>>;
  filteredCoinData: CoinDataProps[];
  setFilteredCoinData: React.Dispatch<React.SetStateAction<CoinDataProps[]>>;
  coinInfo: CoinInfoProps;
  setCoinInfo: React.Dispatch<React.SetStateAction<CoinInfoProps>>;
  setData: (data: CoinDataApiResponse) => void;
}

export const CoinContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [coinData, setCoinData] = React.useState<CoinDataProps[]>([]);
  const [filteredCoinData, setFilteredCoinData] = React.useState<CoinDataProps[]>([]);
  const [coinInfo, setCoinInfo] = React.useState<CoinInfoProps>({} as CoinInfoProps);

  const setData = (data: CoinDataApiResponse) => {
    setCoinData(data.data);
    setFilteredCoinData(data.data);
    setCoinInfo(data.info);
  };

  return (
    <CoinDataProvider
      value={{
        coinData,
        setCoinData,
        coinInfo,
        setCoinInfo,
        setData,
        filteredCoinData,
        setFilteredCoinData,
      }}
    >
      {children}
    </CoinDataProvider>
  );
};

export const CoinDataProvider = coinDataContext.Provider;
