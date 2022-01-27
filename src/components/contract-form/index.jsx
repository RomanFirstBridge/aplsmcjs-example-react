import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export const ContractForm = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = () => {
    onSubmit(value);
  }

  return (
    <form>
      <Box display="flex" justifyContent="space-around" margin={5}>
        <TextField
          label="Contract"
          variant="outlined"
          type="text"
          name='contract'
          onChange={handleChange}
        />
        <Button color="primary" type='button' onClick={handleSubmit} variant='contained'>Connect to contract</Button> 
      </Box>
    </form>
  );
};
