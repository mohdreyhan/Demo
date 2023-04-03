import * as React from "react";
import { Grid, Box, Divider, Typography,MemoryIcon } from "@oasis/react-core";
 import useStyles from "./CustomDetails.style";
import MoreButton from "../../../Common/AEComponents/More/MoreButton";
import CustomData from "./CustomData";
import { ColorPallete } from "../../../../theme/ColorPallete";

const CustomDetails = () => {
  const styles = useStyles();
 
  return (
    <Box className={styles.box}>
      <Grid container spacing={3} style={{padding: '0px 5px 0px 5px'}}>
        <Grid item xs={3} style={{ display: "flex",flexWrap:"wrap",gap:5 }}>
        <MemoryIcon style={{ color:`${ColorPallete.Button.Secondary}`,paddingTop: "5px",fontSize: "30" }}/>
       <Typography  style={{ alignSelf: "center", display: "flex", fontStyle: "normal",fontWeight: "400",fontSize: "16px", color: `${ColorPallete.Text.Primary}`}}>Custom</Typography>
        </Grid>
        <Grid item xs={9} style={{ textAlign: "right"}}>
          <MoreButton />
        </Grid>
      </Grid>
      <Divider style={{background:`${ColorPallete.Color.DarkGrey}`}} />
    <Grid container spacing={3}  style={{ marginTop: "0.2px" }}>
        <Grid item xs={4}  style={{ paddingTop: "24px" }}>
          <div className={styles.title}>Application Number</div>
          <div className={styles.gridValue}>{CustomData.customField1}</div>
        </Grid>
        <Grid item xs={4}  style={{ paddingTop: "24px",paddingLeft:"81px" }}>
          <div className={styles.title}>Index Number</div>
          <div className={styles.gridValue}>{CustomData.customField2}</div>
        </Grid>
        <Grid item xs={4}  style={{ paddingTop: "24px",paddingLeft:"48px"}}>
          <div className={styles.title}>Business Structure</div>
          <div className={styles.gridValue}>{CustomData.customField3}</div>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "0.2px" }}>
        <Grid item xs={4}>
          <div className={styles.title}>Loan Type</div>
          <div className={styles.gridValue}>{CustomData.customField4}</div>
        </Grid>
        <Grid item xs={4} style={{paddingLeft:"81px"}}>
          <div className={styles.title}>Date Served</div>
          <div className={styles.gridValue}>{CustomData.customField5}</div>
        </Grid>
        <Grid item xs={4} style={{paddingLeft:"48px"}}>
          <div className={styles.title}>Driver's License Number</div>
          <div className={styles.gridValue}>{CustomData.customField6}</div>
        </Grid>
         </Grid>
         <Grid container spacing={3} style={{ marginTop: "0.2px" }}>
        <Grid item xs={4}>
          <div className={styles.title}>Delinquency Reason</div>
          <div className={styles.gridValue}>{CustomData.customField7}</div>
        </Grid>
        </Grid>
    </Box>
  );
};

export default CustomDetails;
