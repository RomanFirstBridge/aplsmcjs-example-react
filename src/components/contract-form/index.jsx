import { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export const useStyles = makeStyles(() =>
  createStyles({
    input: {
      width: 500,
    }
  }),
);

export const ContractForm = ({ onSubmit }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = () => {
    onSubmit(value);
    setValue('');
  }

  return (
    <form>
      <Box display="flex" justifyContent="space-around" margin={5}>
        <TextField
          className={classes.input}
          value={value}
          label="Contract"
          variant="outlined"
          type="text"
          name='contract'
          onChange={handleChange}
        />
        <Button
          color="primary"
          type='button'
          onClick={handleSubmit}
          variant='contained'
        >
          Connect to contract
        </Button> 
      </Box>
    </form>
  );
};
