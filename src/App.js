import { useState } from 'react';
import { Contract } from 'aplsmcjs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ContractForm } from './components/contract-form';
import { ContractTable } from './components/contract-table';
import { ContractContainer } from './components/ContractContainer'
import './App.css';

function App() {

  const [contractMap, setContractMap] = useState({});
  const [activeContract, setActiveContract] = useState(null);

  const handleAddContract = (contractName) => {

    if (contractMap[contractName]) return;

    let { host, protocol } = window.location;
    const protocolPrefix = protocol === "https:" ? "wss:" : "ws:";
    const forProxy = "socket/";
    const contract = new Contract(
      {
        apiPath: `/rest/v2/smc/${contractName}/event`,
        socketPath: `${protocolPrefix}//${host}/${forProxy}smc/event/`,
      },
      contractName,
      {
        onConnectionOpen: () => {
          console.log('on open')
          setContractMap(state => {
            if (!state[contractName]) {
              state[contractName] = contract;
            }
            setActiveContract(contractName);
            return state;
          })
        },
        onContractConnectionClose: () => {
          setContractMap(({[contractName]: removed, ...state}) => state);
          setActiveContract(null);
        }
      },
    );
  }

  return (
    <div className="App">
      <ContractForm onSubmit={handleAddContract} />
      <Box margin={2}>
        <Typography variant='h2'>Active contract - {activeContract}</Typography>
      </Box>
      <ContractTable contractList={contractMap} onActiveContractSelect={setActiveContract} />
      {Object.entries(contractMap).map(([key, value]) => (
        <ContractContainer
          key={key}
          contractName={key}
          contractInstance={value}
          activeContract={activeContract}
        />
      ))}
    </div>
  );
}

export default App;
