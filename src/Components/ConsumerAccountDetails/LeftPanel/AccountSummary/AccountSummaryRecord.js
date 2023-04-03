import * as React from "react";
import { ColorPallete } from "../../../../theme/ColorPallete";

export default function AccountSummaryRecord(props) {
  let {
    label,
    value,
    handleDialog,
    clickable,
    balance,
    accountUuid,
    accountNumber,
  } = props;
  const useStyles = {
    color: ColorPallete.Color.Blue,
    cursor: "pointer",
  };

  return (
    <>
      <div style={{ paddingBottom: "5px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={clickable === true ? useStyles : {}}
            onClick={() =>
              clickable === true
                ? handleDialog(true, balance, accountUuid, accountNumber, label)
                : null
            }
          >
            {label}
          </div>
          <div style={{ fontSize: "14px", color: ColorPallete.Color.Black }}>
            {value}
          </div>
        </div>
      </div>
    </>
  );
}
