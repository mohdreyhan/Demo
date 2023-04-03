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
      height: "60px",
      borderRadius: "8px 8px 0px 0px",
      borderBottom: "solid 2px #E0E0DF",
    },
    secondIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "40px",
      width: '40px',
      background: '#003F74',
      boxShadow: "2px 2px 8px rgba(0, 28, 72, 0.2)",
      borderRadius: "8px",
      margin:'0px',
      padding:'8px',
    },
    thirdIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50px",
      margin:'0px',
      padding:'0px'
    },
    
  },
  { index: 1 }
);