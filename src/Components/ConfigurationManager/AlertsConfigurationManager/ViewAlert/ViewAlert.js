import React from "react";
import { Paper, MuiButton, Stack, Loader } from "@oasis/react-core";
import AETable from "../../../Common/AEComponents/Table/AETable";
import { TableHeaders } from "./ViewAlert.Data";
import { ColorPallete } from "../../../../theme/ColorPallete";
import WarningAmber from "../../../../../Icons/WarningAmberEllipse.svg";
import { connect } from "react-redux";
import { GETALERTTYPES } from "../../../../Actions/StaticData/ActionCreators";

function ViewAlert(props) {
  const [loading, setLoading] = React.useState(true);
  const [alertData, setData] = React.useState([]);

  const useStyles = {
    spinner: {
      display: "flex",
      justifyContent: "center",
      marginTop: 70,
    },
  };

  const showEmptyTile = (type) => {
    return (
      <>
        <img
          height="132px"
          src={WarningAmber}
          width="132px"
          marginBottom="24px"
        />
        <div
          style={{
            color: ColorPallete.Button.Primary,
            fontSize: "20px",
            marginBottom: "28px",
          }}
        >{`There are no  ${type} created.`}</div>
        <MuiButton
          style={{
            backgroundColor: ColorPallete.Button.Primary,
            color: ColorPallete.Color.White,
          }}
          variant="outlined"
          onClick={() => props.handleDialog(!props.showDialog, "addAlert")}
        >
          {`Create New Alert`}
        </MuiButton>
      </>
    );
  };

  React.useEffect(() => {
    setLoading(true);
    props.GETALERTTYPES();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  React.useEffect(() => {
    const data = props.alertData;
    setData(data);
  }, [props.alertData]);

  const getAlertUI = () => {
    if(props?.alertData?.length > 0)  {
      return <AETable
        tableHeaders={TableHeaders}
        currentRecords={alertData}
        displayStickyHeader="false"
        styles={useStyles}
        handleClick={props.handleClick}
        data={props.data}
        applyMakeStyles={true}
      />
    }
    return (
      <Paper
        style={{
          padding: "50px",
          height: "347px",
          display: "grid",
          alignItems: "center",
        }}
      >
        <Stack sx={{ alignItems: "center" }}>
          {showEmptyTile("Alerts")}
        </Stack>
      </Paper>
    )
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      {getAlertUI()}
    </>
  );
}

function mapStateToProps(state) {
  return {
    alertData: state.StaticDataReducer.alertData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETALERTTYPES: async () => {
      await dispatch(GETALERTTYPES());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAlert);
