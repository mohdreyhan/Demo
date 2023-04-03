import { makeStyles } from "@oasis/react-core";

export default makeStyles( 
  {
    mainbox: {
      height: "100%",
      display: "flex",
    },
    borderLine: {
      border: "solid 0.5px #A6A6A6",
      position: "relative",
    },
    firstIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "110px",
      background: "#003F74",
      borderRadius: "8px 8px 0px 0px",
      borderBottom: "solid 2px #E0E0DF",
    },
    secondIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "70px",
      borderBottom: "solid 2px #E0E0DF",
    },
    thirdIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "73px",
      borderBottom: "solid 2px #E0E0DF",
    },
    paymentButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      boxSizing: "border-box",
      cursor: "pointer",
      userSelect: "none",
      verticalAlign: "middle",
      appearance: "none",
      textDecoration: "none",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "500",
      fontSize: "0.875rem",
      lineHeight: "1.75",
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
      minWidth: "64px",
      padding: "6px 16px",
      margin: "0px",
      borderRadius: "4px",
      transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      color: "#FFFFFF",
      backgroundColor: "#1976d2",
      boxShadow: "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
    }
  },
  { index: 1 }
);