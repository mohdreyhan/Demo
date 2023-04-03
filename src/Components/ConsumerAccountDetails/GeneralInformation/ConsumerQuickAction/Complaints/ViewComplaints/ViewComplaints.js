import * as React from 'react';
import { connect } from 'react-redux';
import { TableHeaders } from './ViewComplaints.Data.js';
import AETable from "../../../../../Common/AEComponents/Table/AETable";
import Paginate from "../../../../../Common/AEComponents/Pagination/Paginate.js";
import { restructureArray } from "../../../../../Common/commonfunctions.js"

const ViewDispute = (props) => {
  const [complaintInfo, setcomplaintInfo] = React.useState([]);
  const [initialRecords, setinitialRecords] = React.useState([]);

  const useStyles = {
    TableContainer: {
      height: 'auto'
    },
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 70
    },
    firstChild: {
      left: 'unset',
      boxShadow: 'unset !important'
    },
    lastChild: {
      padding: 'unset',
      right: 'unset'
    }
  };

  React.useEffect(() => {
    if (props.complaintInformation) {
      let modifiedArray = []
      props.complaintInformation?.forEach((complaint) => {
        complaint.isValid = true;
        return complaint;
      })
      restructureArray(props.complaintInformation, TableHeaders, true).map((rec, index) => {
        const reasonId =
          props?.complaintTypes?.find((type) => type.id == rec.reasonId)?.reason || 'N/A';
        return modifiedArray.push({
          ...rec,
          reasonId: reasonId
        });
      });
      setinitialRecords(modifiedArray);
    }
  }, [props.complaintInformation, props.complaintTypes]);

  const getCurrentRecords = (records) => {
    if (records.length > 0) {
      setcomplaintInfo(records)
    }
  }

  return (
    <>
      <AETable
        tableHeaders={TableHeaders}
        currentRecords={complaintInfo}
        handleClick={props.handleClick}
        data={props.data}
        styles={useStyles}
        applyMakeStyles={true}
      />
      <Paginate getCurrentRecords={getCurrentRecords} consumerAssocAccounts={initialRecords} />
    </>
  );
};

function mapStateToProps(state) {
  return {
    complaintInformation: state.ConsumerQuickActionsReducer.complaintInformation,
    complaintTypes: state.StaticDataReducer.complaintTypes
  };
}

export default connect(mapStateToProps, null)(ViewDispute);
