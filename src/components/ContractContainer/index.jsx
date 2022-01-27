import { useState } from 'react';
import Box from '@material-ui/core/Box';
import { EventForm } from './event-form';
import { EventsTable } from './EventsTable';
import { TableSubscription } from './TableSubscription';

export const ContractContainer = ({ contractName, contractInstance, activeContract }) => {
  const [eventSubscription, setEventSubscription] = useState({});
  const [eventList, setEventList] = useState([]);

  const handleAddEvent = (isOnce, eventParams) => () => {
    if (eventSubscription[eventParams.name]) {
      return;
    }

    const event = contractInstance.addEvent(
      eventParams,
      (err, data) => {
        setEventList(state => [...state, data || err]);
        if(isOnce) {
          setEventSubscription(( {[event.name]: removed , ...state} ) => state);
        }
      },
      ({ subscriptionId, err }) => {
        console.log("🚀 ~ file: index.jsx ~ line 24 ~ handleAddEvent ~ subscriptionId, err", subscriptionId, err)
        if(err) {
          console.log('Event reconntection error!');
          setEventSubscription(( {[event.name]: removed , ...state} ) => state);
          return;
        }
        setEventSubscription((state) => {
          console.log("🚀 ~ file: index.jsx ~ line 32 ~ setEventSubscription ~ state", state)
          return ({
            ...state,
            [event.name]: {
              ...state[event.name],
              subscriptionId,
            },
          })
        })
      },
      () => {
        console.log('Event subscription success');
        setEventSubscription(state => ({
          ...state,
          [event.name]: {
            ...event,
            isOnce,
          },
        }));
      })
  }

  const handleUnsubscribeEvent = (event) => () => {
    contractInstance.removeEvent(event, (err, data) => {
      console.log("🚀 ~ file: index.jsx ~ line 53 ~ contractInstance.removeEvent ~ err, data", err, data)
      if(!err) {
        setEventSubscription(( {[event.name]: removed , ...state} ) => {
          console.log("🚀 ~ file: index.jsx ~ line 62 ~ setEventSubscription ~ removed", removed)
          return state
        });
      }
    })
  }

  return (
    <Box hidden={activeContract !== contractName}>
      <Box margin={5}>
        <EventForm
          contractName={contractName}
          onAddEvent={handleAddEvent}
        />
      </Box>
      <TableSubscription
        data={eventSubscription}
        onUnsubscribe={handleUnsubscribeEvent}
      />
      <EventsTable dataList={eventList} />
    </Box>
  );
}