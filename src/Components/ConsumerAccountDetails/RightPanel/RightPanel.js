import * as React from "react";
import QuickAction from "../../BusinessProcess/QuickAction";
import Notes from "./Notes/Notes";
import Alerts from "./Alerts/Alerts";
import { ColorPallete } from "../../../theme/ColorPallete";
import useStyle from "./RightPanel.styles";
import {
  CreditCardIcon,
  CallToActionOutlinedIcon,
  SortOutlinedIcon,
  NotificationsNoneOutlinedIcon,
  Box,
  Paper,
  MuiButton,
} from "@oasis/react-core";
import { connect } from "react-redux";
import RightPanelImage from "../../../../Icons/BlurImages/RightPanelImage.jpg";
import { PaymentEntry } from "@ps/react-payment-entry";
import { GETALLCONSUMERACCOUNTS, GETACCOUNTSUMMARYCONSUMERDATA } from "../../../Actions/ConsumerDetails/ActionCreators.js";

function RightPanel(props) {
  const styles = useStyle();
  const [openPaymentEntry, setOpenPaymentEntry] = React.useState(false);

  const handlePaymentEntryClick = () => {
    setOpenPaymentEntry(true);
  };

  const handlePaymentRefresh = () => {
    props.GETALLCONSUMERACCOUNTS(localStorage.getItem("customerId"));
    props.GETACCOUNTSUMMARYCONSUMERDATA(localStorage.getItem("customerId"))
  };

  return (
    <>
      {(props.consumerSkipVerification || props.consumerVerification) && (
        <>
          {openPaymentEntry && (
            <PaymentEntry
              handlePaymentRefresh={handlePaymentRefresh}
              closePaymentEntry={() => setOpenPaymentEntry(false)}
              totalPaymentAmount={props?.currentaccountset[0]?.currentAccountBalance}
            />
          )}

          <Box className={styles.mainbox} sx={{ width: "100%", height: "100%", display: "flex" }}>
            {props.isRightPanelExpanded ? (
              <Paper sx={{ width: "100%", height: "100%" }} elevation={10}>
                <QuickAction />
                <div
                  style={{
                    padding: "16px",
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: "1px solid",
                    borderBottomColor: ColorPallete.Border.Panel,
                  }}
                >
                  <MuiButton variant="contained" style={{ width: "100%" }} onClick={handlePaymentEntryClick}>
                    TAKE A PAYMENT
                  </MuiButton>
                </div>
                <Notes />
                <Alerts />
              </Paper>
            ) : (
              <Paper sx={{ width: "100%", height: "100%" }} elevation={10}>
                <div
                  className={styles.firstIcon}
                  style={{
                    height: "110px",
                    display: "flex",
                    background: "#003F74",
                    alignItems: "center",
                    borderBottom: "solid 2px #E0E0DF",
                    borderRadius: "8px 8px 0px 0px",
                    justifyContent: "center",
                  }}
                >
                  <CallToActionOutlinedIcon style={{ width: "37px", height: "23px", color: "#fff" }} />
                </div>
                <div
                  className={styles.secondIcon}
                  style={{
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "solid 2px #E0E0DF",
                    justifyContent: "center",
                  }}
                >
                  <CreditCardIcon
                    style={{
                      width: "37px",
                      height: "24px",
                      background: "#006FBA",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                </div>
                <div
                  className={styles.thirdIcon}
                  style={{
                    height: "73px",
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "solid 2px #E0E0DF",
                    justifyContent: "center",
                  }}
                >
                  <SortOutlinedIcon style={{ width: "77px", height: "26px" }} />
                </div>
                <div
                  className={styles.thirdIcon}
                  style={{
                    border: 0,
                    height: "73px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <NotificationsNoneOutlinedIcon style={{ width: "37px", height: "24px" }} />
                </div>
              </Paper>
            )}
          </Box>
        </>
      )}
      {!(props.consumerSkipVerification || props.consumerVerification) && (
        <Box sx={{ width: "100%", height: "100%" }}>
          <img width="100%" src={RightPanelImage} />
        </Box>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    currentaccountset: state.ConsumerDetailsReducer.currentaccountset,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETALLCONSUMERACCOUNTS: async (customerId) => {
      await dispatch(GETALLCONSUMERACCOUNTS(customerId));
    },
    GETACCOUNTSUMMARYCONSUMERDATA: async (customerId) => {
      await dispatch(GETACCOUNTSUMMARYCONSUMERDATA(customerId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
