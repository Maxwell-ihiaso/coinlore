import { CoinDataProps, HeadCell, Order } from '@/interface';
import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    align: 'right',
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'name',
    align: 'right',
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'rank',
    align: 'right',
    disablePadding: false,
    label: 'Rank',
  },
  {
    id: 'price_usd',
    align: 'right',
    disablePadding: false,
    label: 'Price (USD)',
  },
  {
    id: 'percent_change_24h',
    align: 'right',
    disablePadding: false,
    label: 'Percent Change (24h)',
  },
  {
    id: 'price_btc',
    align: 'right',
    disablePadding: false,
    label: 'Price (BTC)',
  },
  {
    id: 'market_cap_usd',
    align: 'right',
    disablePadding: false,
    label: 'Market Cap (USD)',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CoinDataProps) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const theme = useTheme();
  const createSortHandler =
    (property: keyof CoinDataProps) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
              style: { borderRadius: '14px' },
            }}
            sx={{
              cursor: 'pointer',
              borderRadius: '14px',
              ['&.MuiChecked']: {
                accentColor: 'common.white',
              },
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ textAlign: 'center', wordWrap: 'nowrap' }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
