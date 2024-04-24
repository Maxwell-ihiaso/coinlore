import { TableRow, TableCell, Skeleton } from '@mui/material';
export const TableRowsLoader: React.FC<{ rowsNum?: number; colNum?: number }> = ({
  rowsNum = 10,
  colNum = 12,
}) => {
  return (
    <>
      {[...Array(rowsNum)].map((row, index) => (
        <TableRow key={index}>
          {[...Array(colNum)].map((_, idx) => (
            <>
              <TableCell key={idx}>
                <Skeleton animation="wave" variant="text" />
              </TableCell>
            </>
          ))}
        </TableRow>
      ))}
    </>
  );
};
