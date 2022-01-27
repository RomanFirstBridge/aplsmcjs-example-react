import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const TableSubscription = ({data, onUnsubscribe}) => {
  return (
    <Box margin={5}>
      <Typography variant="h4" align='center'>Event's subscription</Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Signature</TableCell>
              <TableCell align="right">From block</TableCell>
              <TableCell align="right">Filter</TableCell>
              <TableCell align="right">Once event</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(data).map(({isOnce, ...row}) => (
              <TableRow key={row.subscriptionId}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.signature}</TableCell>
                <TableCell align="right">{row.fromBlock}</TableCell>
                <TableCell align="right">{row.filter}</TableCell>
                <TableCell align="right">{isOnce}</TableCell>
                <TableCell align="right">
                  <Button type="button" onClick={onUnsubscribe(row)}>
                    Unsubscribe event
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}