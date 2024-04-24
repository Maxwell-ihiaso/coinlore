import { CoinDataProps } from '@/interface';
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

type Order = 'asc' | 'desc';

interface HeadCell {
  disablePadding: boolean;
  id: keyof CoinDataProps;
  label: string;
  align: 'left' | 'right' | 'center';
}

export const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    align: 'right',
    disablePadding: false,
    label: 'id',
  },
  {
    id: 'symbol',
    align: 'right',
    disablePadding: false,
    label: 'Symbol',
  },
  {
    id: 'name',
    align: 'right',
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'nameid',
    align: 'right',
    disablePadding: false,
    label: 'Name Id',
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
    label: 'USD ($)',
  },
  {
    id: 'price_btc',
    align: 'right',
    disablePadding: false,
    label: 'BTC',
  },
  {
    id: 'market_cap_usd',
    align: 'right',
    disablePadding: false,
    label: 'Market Cap ($)',
  },
  {
    id: 'percent_change_24h',
    align: 'right',
    disablePadding: false,
    label: 'Change in 24h',
  },
  {
    id: 'percent_change_1h',
    align: 'right',
    disablePadding: false,
    label: 'Change in 1h',
  },
  {
    id: 'percent_change_7d',
    align: 'right',
    disablePadding: false,
    label: 'Change in 7d',
  },
  {
    id: 'csupply',
    align: 'right',
    disablePadding: false,
    label: 'C Supply',
  },
  {
    id: 'tsupply',
    align: 'right',
    disablePadding: false,
    label: 'T Supply',
  },
  {
    id: 'msupply',
    align: 'right',
    disablePadding: false,
    label: 'M Supply',
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
              ['&:hover']: { bgcolor: 'green' },
              ['&:focus']: { bgcolor: 'green' },
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
