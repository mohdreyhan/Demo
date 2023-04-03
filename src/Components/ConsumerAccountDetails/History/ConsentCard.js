import { Box, Grid, Typography, DomainVerificationIcon, ArrowForwardIcon } from "@oasis/react-core";
import { ColorPallete } from '../../../theme/ColorPallete';
import StatusLabel from "./ContactHistory/StatusLabel";

const ConsentCard = (props) => {
    const { data } = props
    return (
        <Box
            component="div"
            sx={{
                minHeight: "80px",
                border: "1px solid #E0E0DF",
                boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                mt: 1
            }}
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
                        width: "32px"
                    }}
                >
                    <Typography
                        sx={{
                            backgroundColor: ColorPallete.Color.LightBlue,
                            color: ColorPallete.Color.White,
                            display: "flex",
                            flexDirection: "column",
                            flexGrow: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            borderRadius: "4px 0px 0px 4px"
                        }}
                    >
                        <DomainVerificationIcon />
                    </Typography>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction={"column"} sx={{ paddingRight: "16px", paddingBottom: "8px"}}>
                        <Box component={'div'} sx={{ justifyContent: "space-between", display: "flex" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        color: ColorPallete.Text.Primary,
                                        marginRight: "5px", 
                                    }} dangerouslySetInnerHTML={{
                                        __html: data.action,
                                    }}>
                                </Box>
                                <Box
                                    component={"span"}
                                    sx={{
                                        fontSize: "12px",
                                        color: ColorPallete.Text.Secondary
                                    }} dangerouslySetInnerHTML={{
                                        __html: data.date,
                                    }}>
                                </Box>
                            </Box>

                            <Box>
                                <StatusLabel key={`status_${data.id}`} data={{ statusCode: data.statusCode, status: data.status }} />
                            </Box>

                        </Box>
                        <Box component={'div'} sx={{ justifyContent: "space-between", display: "flex", mt: 1 }}>
                            <Box>
                                <Box 
                                    component={'span'} 
                                    sx={{
                                        color: ColorPallete.Text.Primary,
                                        fontSize: "14px"
                                    }} 
                                    dangerouslySetInnerHTML={{
                                        __html: `${data.responsiblePartyName}`,
                                    }}>
                                </Box>
                            </Box>
                            <Box sx={{
                                color: ColorPallete.Text.Secondary,
                                fontSize: "12px"
                            }} dangerouslySetInnerHTML={{
                                __html: `Completed By: ${data.agentName}`,
                            }}>
                            </Box>
                        </Box>
                        <Box component={'div'} sx={{ justifyContent: "flex-start", display: "flex", mt: 1 }}>
                                <Box component={'span'} sx={{
                                    color: ColorPallete.Text.Primary,
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    marginRight: "5px"
                                }} dangerouslySetInnerHTML={{
                                    __html: `${data.consentType}`,
                                }}></Box>
                                <Box component={'span'} sx={{
                                    color: ColorPallete.Color.Black,
                                    fontSize: "12px",
                                    fontWeight:"400",
                                }} dangerouslySetInnerHTML={{
                                    __html: `${data.value} - ${data.typeOfValue}`,
                                }}></Box>
                        </Box>
                        <Box component={"div"} sx={{  marginLeft: "16px",marginTop:"4px" }}>
                            
                                {
                                    Array.isArray(data.consent) && data.consent?.map((item)=>{
                                      return(
                                        <Box component={'div'} key={`key_${data.consentValue}`} sx={{ display: "flex", alignItems: "center !important" }}>
                                            <Box component={'span'} sx={{
                                                color: ColorPallete.Text.Primary,
                                                fontSize: "12px",
                                                fontWeight: "700",
                                                marginRight: "10px"
                                            }} dangerouslySetInnerHTML={{
                                                __html: item.consentValue,
                                            }}></Box>
                                            {item.fromValue ?
                                                <Box component={'span'} sx={{
                                                    fontSize: "12px",
                                                    color: ColorPallete.Text.Secondary,
                                                    marginRight: "10px"
                                                }} dangerouslySetInnerHTML={{
                                                    __html: item.fromValue,
                                                }}></Box> : ""}
                                            {data.isChanged ?
                                                <ArrowForwardIcon sx={{
                                                    color: ColorPallete.Button.Secondary, fontSize: "12px",
                                                    marginRight: "10px"
                                                }} /> : ""}
                                            {item.toValue ?
                                                <Box component={'span'} sx={{
                                                    fontSize: "12px", color: ColorPallete.Text.Secondary
                                                }} dangerouslySetInnerHTML={{
                                                    __html: item.toValue
                                                }}></Box> : ""}
                                        </Box>
                                      )  
                                    })
                                }       
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ConsentCard