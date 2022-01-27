import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { useState } from "react"

const initialData = {
  event: '',
  from: '',
  to: '',
  filter: '',
  fromBlock: '',
  blockTo: '',
}

export const HistoricalDataForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState(initialData);

  const handleChange = (e) => {
    setFormState(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    const validateData = Object
      .entries(formState)
      .reduce((acc, [key,value]) => {
        if(value) {
          acc[key] = value;
        }
        return acc;
      }, {});

    onSubmit(validateData);
    setFormState(initialData);
  }

  return (
    <Box component="form" margin={5}>
      <Typography variant="h4">Historical data form</Typography>
      <Box margin={3}>
        <TextField
          label="Event name"
          variant="outlined"
          type="text"
          name='event'
          onChange={handleChange}
          value={formState.event}
        />
      </Box>
      <Box margin={3}>
        <TextField
          label="From"
          variant="outlined"
          type="text"
          name='from'
          onChange={handleChange}
          value={formState.from}
        />
      </Box>
      <Box margin={3}>
        <TextField
          label="To"
          variant="outlined"
          type="text"
          name='to'
          onChange={handleChange}
          value={formState.to}
        />
      </Box>
      <Box margin={3}>
        <TextField
          label="Filter"
          variant="outlined"
          type="text"
          name='filter'
          onChange={handleChange}
          value={formState.signature}
        />
      </Box>
      <Box margin={3}>
        <TextField
          label="From block"
          variant="outlined"
          type="text"
          name='fromBlock'
          onChange={handleChange}
          value={formState.fromBlock}
        />
      </Box>
      <Box margin={3}>
        <TextField
          label="To block"
          variant="outlined"
          type="text"
          name='blockTo'
          onChange={handleChange}
          value={formState.blockTo}
        />
      </Box>
      <Box>
        <Button
          type="button"
          onClick={handleSubmit}
          variant="outlined"
          color="primary"
        >
          Get data!
        </Button>
      </Box>
    </Box>
  )
}