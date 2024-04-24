'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EnhancedTableToolbar from './TableToolbar';
import EnhancedTableHead, { headCells } from './TableHead';
import axios from 'axios';
import getComparator from '@/utils/getComparator';
import { CoinDataApiResponse, CoinDataProps, CoinInfoProps } from '@/interface';
import convertNumberToReadableString from '@/utils/convertNumToReadableString';
import { useFetch } from '@/hooks/useFetch';
import { TableRowsLoader } from '../loader/TableLoader';
import FullWidhtLoader from '../loader/FullWidhtLoader';

export type Order = 'asc' | 'desc';

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof CoinDataProps>('rank');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data, error, isError, isFetching, isLoading, refetch } = useFetch<CoinDataApiResponse>(
    `https://api.coinlore.net/api/tickers/`
  );

  const [coinData, setCoinData] = React.useState<CoinDataProps[]>([]);
  const [coinInfo, setCoinInfo] = React.useState<CoinInfoProps>({} as CoinInfoProps);

  console.log({ coinData, coinInfo });

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof CoinDataProps) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = coinData?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - coinData?.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(coinData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [coinData, order, orderBy, page, rowsPerPage]
  );

  console.log({ visibleRows });

  React.useEffect(() => {
    if (data && data?.data.length > 0) {
      setCoinData(data?.data);
      setCoinInfo(data?.info);
    }
  }, [data]);

  if (isLoading) {
    return <FullWidhtLoader />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={coinData?.length}
            />
            <TableBody>
              {isLoading ? (
                <TableRowsLoader rowsNum={10} colNum={headCells.length + 1} />
              ) : isFetching && !isLoading ? (
                <TableRowsLoader rowsNum={10} colNum={headCells.length + 1} />
              ) : (
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="right"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.symbol}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.nameid}</TableCell>
                      <TableCell align="right">{convertNumberToReadableString(row.rank)}</TableCell>
                      <TableCell align="right">
                        {convertNumberToReadableString(row.price_usd)}
                      </TableCell>
                      <TableCell align="right">
                        {convertNumberToReadableString(row.price_btc)}
                      </TableCell>
                      <TableCell align="right">
                        {convertNumberToReadableString(row.market_cap_usd)}
                      </TableCell>
                      <TableCell align="right">
                        {convertNumberToReadableString(row.percent_change_24h)}
                      </TableCell>

                      <TableCell align="right">
                        {convertNumberToReadableString(row.percent_change_1h)}
                      </TableCell>
                      <TableCell align="right">
                        {convertNumberToReadableString(row.percent_change_7d)}
                      </TableCell>
                      <TableCell align="right">
                        {convertNumberToReadableString(row.csupply)}
                      </TableCell>
                      <TableCell align="right">
                        {convertNumberToReadableString(row.tsupply)}
                      </TableCell>
                      <TableCell align="right">
                        {convertNumberToReadableString(row.msupply)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={coinData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
