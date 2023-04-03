import * as React from "react";
import { Box, Paper } from "@oasis/react-core";
import ConsumerDetails from "./ConsumerDetails/ConsumerDetails.js";
import AccountSummary from "./AccountSummary/AccountSummary.js";
import ListView from "./ListView/ListView.js";
import { connect } from "react-redux";
import LeftPanelImage from "../../../../Icons/BlurImages/LeftPanelImage.jpg";
import AccountSummaryIcon from "../../../../Icons/AccountsNew.svg";
///

import History from "../../../../Icons/History.svg";
import Support from "../../../../Icons/Support.svg";
import Transactions from "../../../../Icons/Transactions.svg";
import Sensitive from "../../../../Icons/Sensitive.svg";
import Custom from "../../../../Icons/Custom.svg";
import GeneralInformationOnSelectIcon from "../../../../Icons/IconsOnSelect/GeneralInformationOnSelect.svg";

import { ColorPallete } from "../../../theme/ColorPallete";
import ConsumerDetailsIcon from "../../../../Icons/ConsumerDetails.svg";
import useStyle from "./LeftPanel.styles";

function LeftPanel(props) {
  const styles = useStyle();
  const [Show , setShow] = React.useState(false);
  
  const handleShowAccordion = (value) => {
    setShow(!value);
  };
  return (
    <>
      {(props.consumerSkipVerification || props.consumerVerification) && (
        <>
          <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
            {props.isLeftPanelExpanded ? (
              <Paper sx={{ width: "100%", height: "100%" }} elevation={10}>
                <ConsumerDetails Show={Show} handleShowAccordion={handleShowAccordion}/>
                <AccountSummary />
                <ListView {...props} />
              </Paper>
            ) : (
              <Paper sx={{ width: "100%", height: "100%" }} elevation={10}>
                <div
                  className={styles.firstIcon}
                  style={{
                    height: "82px",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: `solid 2px ${ColorPallete.Button.Tertiary}`,
                    borderRadius: "8px 8px 0px 0px",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      alignSelf: "center",
                      marginTop: "10px",
                      padding: "5px 5px 3px 5px",
                      backgroundColor:
                        ColorPallete.AccordionSummary.backgroundColor,
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      src={ConsumerDetailsIcon}
                      style={{
                        width: "18px",
                        height: "18px",
                        color: `${ColorPallete.Color.White}`,
                      }}
                    />
                  </div>
                </div>

                <div
                  className={styles.firstIcon}
                  style={{
                    height: "82px",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: `solid 2px ${ColorPallete.Button.Tertiary}`,
                    borderRadius: "8px 8px 0px 0px",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={AccountSummaryIcon}
                    style={{
                      width: "18px",
                      height: "18px",
                      color: `${ColorPallete.Color.White}`,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                   <div
                   className={styles.secondIcon}
                    style={{
                      alignSelf: "center",
                      marginTop: "10px",
                      borderRadius: "8px",
                    }}
                  >
                  <img
                    src={GeneralInformationOnSelectIcon}
                    style={{
                      width: "18px",
                      height: "18px",
                      color: `${ColorPallete.Color.White}`,
                    }}
                  />
                  </div>
                </div>
                <div className={styles.thirdIcon}>
                  <img
                    src={History}
                    style={{
                      width: "18px",
                      height: "18px",
                      color: `${ColorPallete.Color.White}`,
                    }}
                  />
                </div>
                <div className={styles.thirdIcon}>
                  <img
                    src={Support}
                    style={{
                      width: "18px",
                      height: "18px",
                      color: `${ColorPallete.Color.White}`,
                    }}
                  />
                </div>
                <div className={styles.thirdIcon}>
                  <img
                    src={Transactions}
                    style={{
                      width: "18px",
                      height: "18px",
                      color: `${ColorPallete.Color.White}`,
                    }}
                  />
                </div>
                <div className={styles.thirdIcon}>
                  <img
                    src={Sensitive}
                    style={{
                      width: "18px",
                      height: "18px",
                      color: `${ColorPallete.Color.White}`,
                    }}
                  />
                </div>
                <div className={styles.thirdIcon}>
                  <img
                    src={Custom}
                    style={{
                      width: "18px",
                      height: "18px",
                      color: `${ColorPallete.Color.White}`,
                    }}
                  />
                </div>
              </Paper>
            )}
          </Box>
        </>
      )}
      {!(props.consumerSkipVerification || props.consumerVerification) && (
        <Box sx={{ width: "100%", height: "100%" }}>
          <img width="100%" src={LeftPanelImage} />
        </Box>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification:
      state.ConsumerDetailsReducer.consumerSkipVerification,
    responsibles: state.ConsumerDetailsReducer.spokeToList,
  };
}

export default connect(mapStateToProps)(LeftPanel);
