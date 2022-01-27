import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const EventsTable = ({ dataList }) => {

  const handleData = (d) => {
    const data = JSON.parse(d);
    return Object
      .keys(data)
      .reduce((acc, key) => acc += `${key}: ${data[key].value};  `, '');
  }

  return (
    <Box margin={5}>
      <Typography variant="h4" align='center'>Event's received</Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Signature</TableCell>
              <TableCell align="right">Filter</TableCell>
              <TableCell align="right">Transaction</TableCell>
              <TableCell align="right">Block number</TableCell>
              <TableCell align="right">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((row) => (
              <TableRow key={row.transaction}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{handleData(row.data)}</TableCell>
                <TableCell align="right">{row.signature}</TableCell>
                <TableCell align="right">{row.filter}</TableCell>
                <TableCell align="right">{row.transaction}</TableCell>
                <TableCell align="right">{row.blockNumber}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}