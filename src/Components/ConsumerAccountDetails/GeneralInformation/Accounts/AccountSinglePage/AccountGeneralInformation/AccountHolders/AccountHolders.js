import * as React from "react";
import { Box, Paper } from "@oasis/react-core";
import ToolbarComponent from "../../../../../../Common/AEComponents/Toolbar/ToolbarComponent.js";
import { ToolbarData, ToolbarStructure, TableHeaders } from "./AccountHoldersData.js";
import AETable from "../../../../../../Common/AEComponents/Table/AETable.jsx";
import { connect } from "react-redux";

function AccountHolders(props) {
  const useStyles = {
    spinner: {
      display: "flex",
      justifyContent: "center",
      marginTop: 70,
    },
    firstChild: {
      left: "unset",
      boxShadow: "unset !important",
    },
    lastChild: {
      padding: "unset",
      right: "unset",
    },
  };

  const [accountData, setAccountData] = React.useState([]);

  const relationshipFinder = (values) => {
    if (props.relationshipTypesData) {
      return props.relationshipTypesData?.find((type) => values.relationshipTypeId == type.id)?.name ?? "N/A";
    }
  };

  React.useEffect(() => {
    let accountDetails = [];
    if (props.dependentsList) {
      accountDetails = props.dependentsList;
      accountDetails = accountDetails.filter(
        (v, i, a) => a.findIndex((v2) => `${v2?.firstName} ${v2?.lastName}` === `${v?.firstName} ${v?.lastName}`) === i
      );
      accountDetails = accountDetails.map((data) => {
        let typeName = relationshipFinder(data);
        return { ...data, name: data.firstName + " " + data.lastName, relationshipType: typeName };
      });
      setAccountData(accountDetails);
    }
  }, [props.dependentsList]);


  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }} elevation={10}>
        <ToolbarComponent ToolbarData={ToolbarData} ToolbarStructure={ToolbarStructure} />
        <AETable tableHeaders={TableHeaders} currentRecords={accountData} styles={useStyles} applyMakeStyles={true} />
      </Paper>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    spokeToList: state.ConsumerDetailsReducer.spokeToList,
    relationshipTypesData: state.ConsumerDetailsReducer.relationshipTypesData,
    dependentsList: state.ConsumerDetailsReducer.dependentsList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountHolders);
