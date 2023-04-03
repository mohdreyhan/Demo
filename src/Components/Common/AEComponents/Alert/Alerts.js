import React from "react";
import {Alert, Stack} from "@oasis/react-core";
import { ColorPallete } from "../../../../theme/ColorPallete";

function Alerts(props) {
  return (
    <Stack sx={{  marginLeft: "22px", marginRight: "22px", width: "-webkit-fill-available" }} spacing={2}>
      {props.warnings?.map((warning, index) => (
        <div key={`alert${warning.text}_${index+1}`}>
          <Alert
            onClose={() => {
              props.clearWarnings();
            }}
            severity={warning.alertType}
            sx={{
              padding: "4px 11px",
              color: `${ColorPallete.Text.Primary}`,
              backgroundColor: `${warning.backgroundColor}`,
              "& .MuiAlert-icon": {
                color: `${warning.iconColor}`,
              },
              "& .MuiAlert-message": {
                alignSelf: "flex-end",
              },
            }}
          >
            {warning.text}
          </Alert>
        </div>
      ))}
    </Stack>
  );
}

export default Alerts;
