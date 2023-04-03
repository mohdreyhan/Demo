import React from 'react';
import {
 Box, Grid 
} from '@oasis/react-core';
import PhoneIcon from "@mui/icons-material/Phone";
import { ColorPallete } from "../../../theme/ColorPallete";

function CallView(props){
  return (
   <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "8px 16px",
        gap: "8px",
        width: "248px",
        height: "70.5px",
        background: ColorPallete.Color.White,
        boxShadow: "2px 2px 12px 4px rgba(0, 0, 0, 0.05)",
        borderRadius: "8px" ,
        flex: "none",
        order: 0,
        flexGrow: 0,
        justifyContent: "center"
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
        sx={{ display: "flex", flexDirection: "column" , alignContent: "flex-start", marginTop: "40px"}}>
        <Grid item xs={2}>
          <div
            style={{
              backgroundColor: ColorPallete.Button.Secondary,
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              marginTop: "7px"
            }}>
            <div
              style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
              }} >
              <PhoneIcon style={{ color: ColorPallete.Color.White }} />
            </div>
          </div>
        </Grid>
        <Grid item xs={10} sx={{marginLeft: '3px'}}>
          <Grid
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "18px",
              textAlign: "justify",
              color: ColorPallete.Text.Secondary
            }}
          >
           {props?.name ?? ''}
          </Grid>
          <Grid
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "36px",
              textAlign: "justify"
            }}
          >
             {props?.value  ?? ''}
          </Grid>
        </Grid>
      </Grid>
    </Box>
   </>
  );
}


export default CallView;