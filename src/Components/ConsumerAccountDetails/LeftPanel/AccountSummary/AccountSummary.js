import * as React from "react";
import { connect } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ExpandMore,
} from "@oasis/react-core";
import { formatCurrencyAllowZero } from "../../../Common/commonfunctions";
import AccountSummaryIcon from "../../../../../Icons/AccountsNew.svg";
import { AccountSummaryInformation } from "./AccountSummary.Data.js";
import { restructureArray } from "../../../Common/commonfunctions.js";
import { ColorPallete } from "../../../../theme/ColorPallete";
import { GETACCOUNTBALANACE } from "../../../../Actions/ConsumerDetails/ActionCreators.js";
import AccountSetSubBalance from "./AccountSetSubBalance/AccountSetSubBalance";
import AccountSummaryRecord from "./AccountSummaryRecord";

const getAccValues = (accSumDatas, accSumApiDatas, consPerInfos) => {
  if(accSumApiDatas?.hasOwnProperty(accSumDatas.accessor)) {
    return accSumApiDatas[accSumDatas.accessor]
  }
  return consPerInfos[accSumApiDatas.accessor]
}

function AccountSummary(props) {
  const [expand, setExpand] = React.useState(true);
  const [showDialog, setDialog] = React.useState(false);
  const [initialBalance, setInitialBalance] = React.useState(false);

  const [accountNumber, setAccountNumber] = React.useState();
  const [accountSubBalanceTitle, setAccountSubBalanceTitle] = React.useState();
  const [accountSummaryConsumerData, setAccountSummaryConsumerData] =
    React.useState([]);

  let currentAccountBalanceVal, currentAccountNumber;
  let currentAccountUuid=localStorage.getItem("currentAccountNumber")
  let currentData=props.currentaccountset.filter((item)=>item.accountUuid==currentAccountUuid)
  // console.log("currentData",currentData)
  currentAccountBalanceVal = currentData[0]?.currentAccountBalance;
  currentAccountNumber = currentData[0]?.accountNumber;
  
  React.useEffect(() => {
    const val = props.consumerSkipVerification || props.consumerVerification;
    setExpand(!val);
  }, [props.consumerVerification, props.consumerSkipVerification]);

  React.useEffect(() => {
     currentAccountUuid=localStorage.getItem("currentAccountNumber")
   currentData=props.currentaccountset.filter((item)=>item.accountUuid==currentAccountUuid)
    currentAccountBalanceVal =
    currentData[0]?.currentAccountBalance;
    currentAccountNumber = currentData[0]?.accountNumber;

    if (props.accountSummaryConsumerData?.length > 0) {
      let temp = props.accountSummaryConsumerData?.map((data) => {
        return {
          ...data,
          currentAccountBalance: currentAccountBalanceVal
        };
      });
      setAccountSummaryConsumerData(temp);
    }
  }, [
    props.consumerAssocAccounts,
    props.accountSummaryConsumerData,
    props.consumerPersonalInfo,
  ]);

  const handleDialog = (value, balance, accountUuid, accountNumbers, label) => {
    if (accountNumbers) {
      setAccountNumber(accountNumbers);
    }
    if (value) {
      props.GETACCOUNTBALANACE(accountUuid);
    }
    setAccountSubBalanceTitle(label);
    if (balance == "initialBalance") {
      setInitialBalance(true);
    } else {
      setInitialBalance(false);
    }
    setDialog(value);
  };

  return (
    <>
      <Accordion
        expanded={expand}
        disableGutters
        sx={{
          "&.MuiPaper-root": {
            "&.MuiAccordion-root": {
              borderBottom: `1px solid ${ColorPallete.Border.Panel}`,
              borderRadius: "0px !important",
            },
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMore
              sx={{
                pointerEvents: "auto",
                cursor: "pointer",
                color: "#003f74",
              }}
            />
          }
          sx={{ pointerEvents: "none", marginRight: "0px !important" }}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <div
            style={{ padding: "5px", borderRadius: "8px", alignSelf: "center" }}
          >
            <img src={AccountSummaryIcon} style={{ height: "20px" }} />
          </div>
          <Typography
            style={{
              alignSelf: "center",
              fontSize: "14px",
              fontweight: "400",
              paddingLeft: "3px",
            }}
          >
            Account Summary
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            fontSize: "12px",
            fontWeight: "400px",
            color: ColorPallete.Text.Secondary,
          }}
        >
          {props.accountSummaryInfo?.length > 0
            ? props.accountSummaryInfo?.map((info, index) => {
                return (
                  <AccountSummaryRecord
                    label={info.label}
                    value={
                      info.operation?.includes("formatCurrencyAllowZero")
                        ? formatCurrencyAllowZero(info.value)
                        : info.value
                    }
                    key={`accsum_${index+1}`}
                    triggerval={["Next Payment Amount", "Next Payment Amount"]}
                    handleDialog={handleDialog}
                    clickable={info.clickable}
                    balance={info.balance}
                    accountUuid={info.accountUuid}
                    accountNumber={info.accountNumber}
                  />
                );
              })
            : restructureArray(
              accountSummaryConsumerData,
                AccountSummaryInformation
              )?.map((accSumApiData, index) =>
                props.consumerPersonalInfo.map((consPerInfo, conPerInfoIndex) =>
                  AccountSummaryInformation.map(
                    (accSumData, accSumDataIndex) => {
                      return (
                        <div key={`setSummary_${accSumDataIndex+1}`}>
                          <AccountSummaryRecord
                            label={accSumData.label}
                            value={
                              getAccValues(accSumData, accSumApiData, consPerInfo)
                            }
                            handleDialog={handleDialog}
                            clickable={accSumData.clickable}
                            balance={accSumData.balance}
                            triggerval={""}
                            accountUuid={localStorage.getItem(
                              "currentAccountNumber"
                            )}
                            accountNumber={currentAccountNumber}
                          />
                        </div>
                      );
                    }
                  )
                )
              )}
        </AccordionDetails>
      </Accordion>

      <AccountSetSubBalance
        showDialog={showDialog}
        handleDialog={handleDialog}
        initialBalance={initialBalance}
        accountNumber={accountNumber}
        accountSubBalanceTitle={accountSubBalanceTitle}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerPersonalInfo: state.ConsumerDetailsReducer.consumerPersonalInfo,
    accountSummaryConsumerData:
      state.ConsumerDetailsReducer.accountSummaryConsumerData,
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification:
      state.ConsumerDetailsReducer.consumerSkipVerification,
    accountSummaryInfo: state.ConsumerDetailsReducer.accountSummaryInfo,
    consumerAssocAccounts: state.ConsumerDetailsReducer.consumerAssocAccounts,
    currentaccountset: state.ConsumerDetailsReducer.currentaccountset,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETACCOUNTBALANACE: async (accountUuid) => {
      await dispatch(GETACCOUNTBALANACE(accountUuid));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSummary);
