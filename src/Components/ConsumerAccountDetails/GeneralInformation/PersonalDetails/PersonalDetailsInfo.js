import * as React from "react";
import { Box, Paper, Grid, Accordion, AccordionSummary, AccordionDetails, Typography, ExpandMore } from "@oasis/react-core";
import PersonalDetails from "./PersonalDetails.js";
import ConsumerDetails from "../../../../../Icons/ConsumerDetails.svg";
import VerifiedIcon from "../../../../../Icons/verified.svg";
import MoreButton from "../../../Common/AEComponents/More/MoreButton";
import { connect } from "react-redux";

function PersonalDetailsInfo(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: "8px" }} elevation={10}>
        <Accordion disableGutters expanded={props.expand}>
          <Grid container style={{ padding: "0px 24px", alignItems: "center" }}>
            <Grid item xs={11.3}>
              <AccordionSummary
                sx={{
                  pointerEvents: "none",
                  padding: 0,
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                  },
                  "& .Mui-expanded": {
                  },
                }}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid
                  style={{ marginTop: "1px" }}
                  item
                  xs={0.4}
                >
                  <img src={ConsumerDetails} />
                </Grid>
                <Grid item xs={8.5}>
                  <Typography
                    style={{
                      fontSize: "16px",
                      fontWeight: "400",
                      paddingLeft: "5px",
                    }}
                  >
                    Consumer Details
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2.1}
                  style={{
                    marginLeft: "14px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {!(props.consumerSkipVerification) && (
                    <>
                  <img src={VerifiedIcon} style={{ marginRight: "4px" }} />
                  <div style={{ color: "#527D24" }}>Verified</div>
                  </>
                  )}
                </Grid>
                
                <Grid
                  item
                  xs={0.8}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ExpandMore
                    onClick={() => props.rotateExpandIcon()}
                    style={{
                      color: "003F74",
                      pointerEvents: "auto",
                      transform: `${props.rotation}`
                    }}
                  />
                </Grid>
              </AccordionSummary>
            </Grid>
            <Grid
              item
              xs={0.7}
              style={{
                pointerEvents: "auto",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <MoreButton
                data={props.consumerDemographics}
                handleClick={props.handleClick}
              />
            </Grid>
          </Grid>
          <div
            style={{
              border: "solid 0.5px #A6A6A6",
              margin: "0px 27px 0px 24px",
              position: "relative",
            }}
          ></div>
          <AccordionDetails sx={{ padding: 0 }}>
            <PersonalDetails rotation={props.rotation} expand={props.expand} rotateExpandIcon={props.rotateExpandIcon}/>
          </AccordionDetails>
        </Accordion>
        
      </Paper>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    
  };
}

export default connect(mapStateToProps)(PersonalDetailsInfo);
