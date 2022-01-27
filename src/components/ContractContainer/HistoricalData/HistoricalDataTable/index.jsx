import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const HistoricalDataTable = ({ data }) => {
  return (
    <Box margin={5}>
      <Typography variant="h4" align='center'>Historical events</Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Event Id</TableCell>
              <TableCell align="right">Spec</TableCell>
              <TableCell align="right">Transaction</TableCell>
              <TableCell align="right">Block</TableCell>
              <TableCell align="right">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.transaction}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.eventId}</TableCell>
                <TableCell align="right">{row.spec}</TableCell>
                <TableCell align="right">{row.transaction}</TableCell>
                <TableCell align="right">{row.block}</TableCell>
                <TableCell align="right">{row.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}