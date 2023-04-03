import * as React from "react";
import { Box, Grid, Typography, AttachMoneyIcon } from "@oasis/react-core";
import { ColorPallete } from "../../../theme/ColorPallete";
import StatusLabel from "./ContactHistory/StatusLabel";

export default function PaymentHistoryCard(props) {
  const { data, handleOnClick } = props;

  return (
    <>
      <Box
        component="div"
        sx={{
          minHeight: "80px",
          flexGrow: 1,
          border: "1px solid #E0E0DF",
          boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.1)",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          mt: 1,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: ColorPallete.AccordionSummary.backgroundColor,
          },
        }}
        onClick={handleOnClick}
      >
        <Grid
          container
          spacing={2}
          sx={{
            padding: "0px !important",
            margin: "0px",
          }}
        >
          <Grid
            item
            sx={{
              padding: "0px !important",
              margin: "0px",
              width: "32px",
            }}
          >
            <Typography
              sx={{
                backgroundColor: ColorPallete.Color.LightBlue,
                color: ColorPallete.Color.White,
                display: "flex",
                alignItems: "center",
                height: "100%",
                borderRadius: "4px 0px 0px 4px",
                paddingLeft: "8px",
              }}
            >
              <AttachMoneyIcon />
            </Typography>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction={"column"}
              sx={{ paddingRight: "16px", paddingBottom: "16px" }}
            >
              <Box
                component={"div"}
                sx={{ justifyContent: "space-between", display: "flex" }}
              >
                <Box>
                  <Box
                    component={"label"}
                    sx={{
                      fontWeight: 700,
                      fontSize: "14px",
                      color: ColorPallete.Text.Primary,
                      marginRight: "5px",
                      //textTransform: "capitalize"
                    }}
                    dangerouslySetInnerHTML={{
                      __html: data.action,
                    }}
                  ></Box>
                  <Box
                    component={"span"}
                    sx={{
                      fontSize: "12px",
                      color: ColorPallete.Text.Secondary,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: data.date,
                    }}
                  ></Box>
                </Box>
                <Box>
                  <StatusLabel
                    data={{
                      statusCode: data.statusCode,
                      status: `${data.status}`,
                    }}
                  />
                </Box>
              </Box>
              <Box
                component={"div"}
                sx={{ justifyContent: "space-between", display: "flex", mt: 1 }}
              >
                <Box>
                  <Box
                    component={"span"}
                    sx={{
                      color: ColorPallete.Text.Primary,
                      fontSize: "14px",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: data.payment,
                    }}
                  ></Box>
                  <Box
                    component={"span"}
                    sx={{
                      color: ColorPallete.Color.Black,
                      fontSize: "12px",
                      marginLeft: "5px",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: `${data.consumerName}`,
                    }}
                  ></Box>
                </Box>
                <Box
                  sx={{
                    color: ColorPallete.Text.Secondary,
                    fontSize: "12px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: `Completed By: ${data.agentName}`,
                  }}
                ></Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* <PopUp
                showDialog={showPopup}
                handleDialog={handleDialog}
                dialogDataHeader={dialogPaymentHeader}
                dialogStructureHeader={dialogStructureHeader}
                dialogDataFooter={dialogPaymentFooter}
                dialogStructureFooter={dialogStructureFooter}
                formName="singlePayment"
            >
            </PopUp> */}
    </>
  );
}
