import { Box } from "@material-ui/core";
import { useState } from "react";
import { HistoricalDataForm } from "./HistoricalDataForm";
import { HistoricalDataTable } from "./HistoricalDataTable";

export const HistoricalData = ({ contractInstance }) => {
  const [dataList, setDataList] = useState([]);

  const handleGetData = ({event, ...rest}) => {
    contractInstance
      .getHistoricalData(event, rest)
      .then(res => {
        setDataList(res || []);
      });
  }

  return (
    <Box>
      <HistoricalDataForm onSubmit={handleGetData} />
      <HistoricalDataTable data={dataList} />
    </Box>
  );
}