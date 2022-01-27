import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export const ContractTable = ({ contractList, onActiveContractSelect }) => {
  const handleRowClick = (contractName) => () => {
    onActiveContractSelect(contractName);
  }

  return (
    <Box margin={5}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Contract</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(contractList).map(([key, { closeContractConnection }]) => (
              <TableRow key={key} onClick={handleRowClick(key)}>
                <TableCell>{key}</TableCell>
                <TableCell align="right">
                  <Button
                    color="secondary"
                    variant="outlined"
                    type="button"
                    onClick={closeContractConnection}
                  >
                    Close contract connection
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