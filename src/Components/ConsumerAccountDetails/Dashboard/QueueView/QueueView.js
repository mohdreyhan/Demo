import React from "react";
import { TableHeaders } from "./QueueView.data";
import { Grid } from "@oasis/react-core";
import AETable from '../../../Common/AEComponents/Table/AETable';
import Paginate from "../../../Common/AEComponents/Pagination/Paginate.js";
 
function QueueView(props) {
  const { queueListval } = props;
  const [queueList , setQueueList] = React.useState([]);
  const [initialRecords, setinitialRecords] = React.useState([]);

  React.useEffect(() => {
    if (queueListval.length > 0) {
      setinitialRecords(queueListval);
    }
  }, [queueListval]);

  const useStyles = {
  TableContainer: {
    minHeight: "233px",
    maxHeight: "233px",
    overflowY: "auto",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    marginTop: 70,
  },
  firstChild: {
    // position: "unset !important",
    left: "unset",
    boxShadow: "unset !important",
    // backgroundColor: "unset",
  },
  lastChild: {
    padding: "unset",
    // position: "unset",
    right: "unset",
    // backgroundColor: "unset",
  },
};

const getCurrentRecords = (records) => {
  if (records.length > 0) {
    setQueueList(records) 
}
}


  return (
    <Grid
      container
      style={{
        display: "flex",
        marginRight: "10px",
        marginTop: "12px",
        alignContent: "center",
        alignItem: "center",
        justifyContent: "center"
      }}>

        <AETable
        tableHeaders={TableHeaders}
        currentRecords={queueList}
        handleClick={props.handleClick}
        data={props.data}
        styles={useStyles}
        applyMakeStyles={true}
      />
    <Paginate getCurrentRecords={getCurrentRecords} consumerAssocAccounts={initialRecords} />

    </Grid>
  );
}

export default QueueView;
