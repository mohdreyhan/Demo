import * as React from "react";
import { connect } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ArrowDropDownIcon,
  Box,
} from "@oasis/react-core";
import ConsumerDetailsIcon from "../../../../../Icons/ConsumerDetails.svg";
import {
  ConsumerDetailsIntro,
  customerDetailsStyles,
} from "./ConsumerDetails.Data.js";
import { ColorPallete } from "../../../../theme/ColorPallete";
import {
  GETCONSUMERPERSONALINFO,
  GETVERIFICATIONQUESTIONNAIRE,
} from "../../../../Actions/ConsumerDetails/ActionCreators";
import {
  RESETALL,
  ALERT_LIST_ALL,
  CONSUMERSKIPVERIFICATION,
  CONSUMERVERIFICATION,
} from "../../../../Actions/ConsumerDetails/Actions";
import { useNavigate } from "react-router-dom";

function ConsumerDetails(props) {
  const navigation = useNavigate();

  const handleImageClick = (url) => {
    if (url) {
      navigation(url);
    }
  };

  const HandleClickOnConsumer = (consPerInfoApiData) => {
    props.CONSUMERVERIFICATION(false);
    props.CONSUMERSKIPVERIFICATION(false);
    props.ALERT_LIST_ALL();
    localStorage.setItem("responsibleId", consPerInfoApiData.id);
    localStorage.setItem("customerId", consPerInfoApiData.customerId);
    props.GETVERIFICATIONQUESTIONNAIRE(consPerInfoApiData.customerId);
    props.RESETALL();
    navigation("/consumer");
  };

  const accountFinder = (
    consPerInfoApiData = null,
    responsiblesList = null
  ) => {
    let result = {};
    if (responsiblesList != null && consPerInfoApiData != null) {
      result = responsiblesList?.filter(
        (v) =>
          v.customerId === consPerInfoApiData.customerId ||
          `${v.firstName} ${v.lastName}` === consPerInfoApiData.customerName
      );
    }
    return result;
  };

  return (
    <>
      <Accordion
        disableGutters
        sx={{
          "&.MuiPaper-root": {
            "&.MuiAccordion-root": {
              borderBottom: `1px solid ${ColorPallete.Border.Panel}`,
              borderRadius: "8px 8px 0px 0px !important",
              minHeight: "81px",
            },
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            !Object.keys(props.accountGeneralInfo).length && (
              <ArrowDropDownIcon
                sx={{
                  pointerEvents: "auto",
                  cursor: "pointer",
                  color: ColorPallete.Button.Secondary,
                }}
              />
            )
          }
          sx={{
            pointerEvents: "none",
            marginBottom: "0px",
            paddingBottom: "0px",
            marginRight: "0px !important"
          }}
        >
          {Object.keys(props.accountGeneralInfo)?.length ? (
            props.accountGeneralInfo.image && (
              <div
                style={{
                  alignSelf: "center",
                  padding: "5px 5px 3px 5px",
                  marginTop: "15px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  zIndex: "99999",
                }}
                onClick={(e) =>
                  handleImageClick(props.accountGeneralInfo?.backUrl ?? "")
                }
              >
                {props.accountGeneralInfo?.image ?? ""}
              </div>
            )
          ) : (
            <div
              style={{
                alignSelf: "center",
                padding: "5px 5px 3px 5px",
                backgroundColor: ColorPallete.AccordionSummary.backgroundColor,
                borderRadius: "8px",
                marginTop: "15px",
              }}
            >
              <img
                src={ConsumerDetailsIcon}
                style={{ height: "14px", alignSelf: "center" }}
              />
            </div>
          )}

          <div
            style={{ display: "grid", paddingLeft: "10px", marginTop: "15px" }}
          >
            {Object.keys(props.accountGeneralInfo)?.length ? (
              <Box component={"div"}>
                <Box
                  component="div"
                  sx={{
                    fontSize: "16px",
                    display: "flex",
                    color: ColorPallete.Text.Primary,
                  }}
                >
                  {`Acc ${props.accountGeneralInfo.accountNumber}`}
                </Box>
                <Box
                  component="div"
                  sx={{
                    fontSize: "12px",
                    display: "block",
                    color: ColorPallete.Color.Black,
                  }}
                >
                  {props.accountGeneralInfo.clientName}
                </Box>
              </Box>
            ) : (
              props.consumerDemographics.map((consPerInfoApiData) =>
                ConsumerDetailsIntro.map(
                  (ConsumerDetailsIntroData, index) => {
                    return (
                      <div
                        style={{ display: "flex" }}
                        key={`${ConsumerDetailsIntroData.id}_${index+1}`}>
                        {ConsumerDetailsIntroData != undefined &&
                          ConsumerDetailsIntroData.accessor === "fullName" && (
                            <div style={customerDetailsStyles.titleStyle}>
                              {`${consPerInfoApiData["firstName"]} ${consPerInfoApiData["lastName"]}`}
                            </div>
                          )}
                        {ConsumerDetailsIntroData != undefined &&
                          ConsumerDetailsIntroData.accessor ===
                            "customerId" && (
                            <>
                              <div style={customerDetailsStyles.subTitleStyle}>
                                {`ID: ${
                                  accountFinder(
                                    props?.consumerDemographics[0],
                                    props?.responsiblesList
                                  )?.[0]?.customerNumber
                                } `}
                              </div>
                            </>
                          )}
                      </div>
                    );
                  }
                )
              )
            )}
          </div>
        </AccordionSummary>

        <AccordionDetails sx={{ paddingTop: "6px" }}>
          {!Object.keys(props.accountGeneralInfo)?.length &&
            props.consumerDemographics?.length > 0 &&
            React.Children.toArray(
              props?.responsiblesList
                ?.filter(
                  (v, i, a) =>
                    a.findIndex(
                      (v2) =>
                        `${v2?.firstName} ${v2?.lastName}` ===
                        `${v?.firstName} ${v?.lastName}`
                    ) === i
                )
                .filter((v) => {
                  return (
                    props?.consumerDemographics?.[0]?.customerId != v.customerId
                  );
                })
                .map((consPerInfoApiData, index) => {
                  return (
                    <div style={{ display: "flex" }} key={`${consPerInfoApiData.id}_${index+1}`}
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
                          style={{ height: "14px", alignSelf: "center" }}
                        />
                      </div>
                      <div
                        style={{
                          display: "grid",
                          paddingLeft: "10px",
                          marginTop: "15px",
                        }}
                        onClick={() =>
                          HandleClickOnConsumer(consPerInfoApiData)
                        }
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div style={customerDetailsStyles.titleStyle}>
                            {`${consPerInfoApiData.firstName} ${consPerInfoApiData.lastName}`}
                          </div>

                          <div
                            style={customerDetailsStyles.subTitleStyle}
                          >{`ID: ${consPerInfoApiData.customerNumber}`}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    accountSummaryConsumerData:
      state.ConsumerDetailsReducer.accountSummaryConsumerData,
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
    accountGeneralInfo: state.ConsumerDetailsReducer.accountGeneralInfo,
    responsiblesList: state.ConsumerDetailsReducer.responsiblesList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETCONSUMERPERSONALINFO: async (responsibleId) => {
      await dispatch(GETCONSUMERPERSONALINFO(responsibleId));
    },
    CONSUMERVERIFICATION: async (value) => {
      await dispatch(CONSUMERVERIFICATION(value));
    },
    CONSUMERSKIPVERIFICATION: async (value) => {
      await dispatch(CONSUMERSKIPVERIFICATION(value));
    },
    GETVERIFICATIONQUESTIONNAIRE: async (customerId) => {
      await dispatch(GETVERIFICATIONQUESTIONNAIRE(customerId));
    },
    ALERT_LIST_ALL: async () => {
      await dispatch(ALERT_LIST_ALL({}));
    },
    RESETALL: async () => {
      await dispatch(RESETALL());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerDetails);
