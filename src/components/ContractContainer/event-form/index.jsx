import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import { useEffect, useState } from 'react';

export const EventForm = ({ contractName, onAddEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventsList, setEventList] = useState([{
    label: '',
    value: '',
  }]);
  const [form, setForm] = useState({
    name: '',
    signature: '',
    fromBlock: '',
  })

  const handleFormChange = (e) => {
    setForm(state => ({
      ...state,
      [e.target.name]: e.targe.value,
    }));
  }

  const handleChange = () => setIsOpen(state => !state);

  useEffect(() => {
    if(isOpen) {
      fetch(`/rest/v2/smc/${contractName}/spec`, {"method": "GET"})
      .then(res => {
        if(res.status === 200) {
          return res.json();
        }
      })
      .then(res => {
        const membersList = res.members.reduce((acc, item) => {
          if (item.type === "EVENT") {
            acc.push({
              label: item.name,
              value: item.signature,
            });
          }
          return acc;
        }, []);
        setEventList(membersList);
      });    
    }
  }, [isOpen, contractName]);

  const handleSelectChange = (e) => {
    setForm(state => ({
      ...state,
      name: e.target.value.split(":")[0],
      signature: e.target.value,
    }));
  }

  const handleAddEvent = onAddEvent(false, form);
  const handleAddEventOnce = onAddEvent(true, form);

  return (
    <Accordion expanded={isOpen} onChange={handleChange}>
      <AccordionSummary>
        {isOpen ? 'Open' : 'Close'} contract event form
      </AccordionSummary>
      <AccordionDetails>
        <Box component='form' display='flex' flexDirection='column' flexBasis='100%'>
          <FormControl>
            <InputLabel id="select-name">Event name</InputLabel>
            <Select
              labelId="select-name"
              onChange={handleSelectChange}
            >
              {eventsList.map(item => (
                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box margin={3}>
            <TextField
              disabled
              label="Signature"
              variant="outlined"
              type="text"
              name='signature'
              value={form.signature}
            />
          </Box>
          <Box margin={3}>
            <TextField
              label="From block"
              variant="outlined"
              type="text"
              name='fromBlock'
              onChange={handleFormChange}
              value={form.fromBlock}
            />
          </Box>
          <Box display='flex' justifyContent='space-around'>
            <Button color="primary" variant='contained' type='button' onClick={handleAddEvent}>
              Add event
            </Button>
            <Button color="primary" variant='contained' type='button' onClick={handleAddEventOnce}>
              Add event once
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}