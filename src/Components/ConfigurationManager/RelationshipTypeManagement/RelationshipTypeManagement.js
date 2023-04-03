import React from "react";
import { connect } from "react-redux";
import { Box, Paper, Grid, Typography, Loader } from "@oasis/react-core";
import ContactInformationIcon from "../../../../Icons/ContactInformation.svg";
import AETable from "../../Common/AEComponents/Table/AETable";
import { TableHeaders } from "./RelationshipTypesManagement.Data";
import { ColorPallete } from "../../../theme/ColorPallete";
import EditRelationshipInfo from "./EditRelationshipInfo/EditRelationshipInfo";
import { GETRELATIONSHIPTYPESDATA } from "../../../Actions/ConsumerDetails/ActionCreators";

function RelationshipTypeManagement(props) {
  const [showDialog, setDialog] = React.useState(false);
  const [formData, setFormData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const useStyles = {
    spinner: {
      display: "flex",
      justifyContent: "center",
      marginTop: 70,
    },
    firstChild: {
      left: "unset",
      boxShadow: "unset",
      background: "red"
    },
    lastChild: {
      position: "unset !important",
      right: "unset",
      boxShadow: "unset !important",
      width: "719px",
    },
  };

  React.useEffect(() => {
    setLoading(true);
    props.GETRELATIONSHIPTYPESDATA();
    setTimeout(() =>  setLoading(false), 100);
    
  }, []);

  const handleDialog = (value, row) => {
    setFormData(row != undefined ? [row] : []);
    setDialog(value);
  };

  const HoverColor = {
    "&:hover": {
      backgroundColor: `${ColorPallete.AccordionSummary.backgroundColor} !important`,
    },
  };

  return  loading ? (
    <Loader />
  ) : (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%" }} elevation={10}>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            height: "60px",
            padding: "0px 24px",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              borderBottom: "1px solid",
              borderBottomColor: ColorPallete.Border.Primary,
              height: "60px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Grid item sx={{ display: "flex" }}>
              <img src={ContactInformationIcon} />
            </Grid>
            <Grid item sx={{ display: "flex" }}>
              <Typography
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  paddingLeft: "8px",
                  color: ColorPallete.Text.Primary,
                  width: "100%",
                  fontFamily: "poppins"
                }}
              >
                Relationship Type Management
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <AETable
          tableHeaders={TableHeaders}
          type={"relationshipType"}
          handleDialog={handleDialog}
          showDialog={showDialog}
          hover={true}
          hoverColor={HoverColor}
          currentRecords={props.relationshipTypesData}
          showMoreButton="false"
          styles={useStyles}
          applyMakeStyles = {true}
        />
        <EditRelationshipInfo handleDialog={handleDialog} showDialog={showDialog} employerData={formData} />
      </Paper>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    relationshipTypesData: state.ConsumerDetailsReducer.relationshipTypesData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETRELATIONSHIPTYPESDATA: async () => {
      await dispatch(GETRELATIONSHIPTYPESDATA());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RelationshipTypeManagement);
