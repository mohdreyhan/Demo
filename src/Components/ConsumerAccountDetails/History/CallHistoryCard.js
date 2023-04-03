import { Box, Grid, Typography, LocalPhoneIcon } from "@oasis/react-core";
import { ColorPallete } from '../../../theme/ColorPallete';

export default function CallHistoryCard(props) {
    const { data } = props;
    return (
        <Box component="div" sx={{
            minHeight: "80px", flexGrow: 1,
            border: "1px solid #E0E0DF",
            boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            mt: 1

        }}>
            <Grid container spacing={2} sx={{
                padding: "0px !important",
                margin: "0px"
            }}>
                <Grid item sx={{
                    padding: "0px !important",
                    margin: "0px",
                    width: "32px"
                }}>
                    <Typography sx={{
                        backgroundColor: ColorPallete.Color.LightBlue,
                        color: ColorPallete.Color.White,
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        borderRadius: "4px 0px 0px 4px",
                        paddingLeft: "8px",
                    }}>
                        <LocalPhoneIcon />
                    </Typography>
                </Grid>
                <Grid item xs={12} sm container >
                    <Grid item xs container direction={"column"} sx={{ paddingRight: "16px", paddingBottom: "16px" }}>
                        <Box component={'div'}>
                            <Box component={"label"} sx={{
                                fontWeight: 700, fontSize: "14px",
                                color: ColorPallete.Text.Primary,
                                marginRight: "5px",
                            }} dangerouslySetInnerHTML={{
                                __html: data.action,
                            }}></Box>
                            <Box component={"span"} sx={{
                                fontSize: "12px",
                                color: ColorPallete.Text.Secondary
                            }} dangerouslySetInnerHTML={{
                                __html: data.date,
                            }}></Box>
                        </Box>
                        <Box component={'div'} sx={{ justifyContent: "space-between", display: "flex", mt: 1 }}>
                            <Box>
                                <Box component={'span'} sx={{
                                    color: ColorPallete.Text.Primary,
                                    fontSize: "14px"
                                }} dangerouslySetInnerHTML={{
                                    __html: `Voicemail - ${data.voicemail}`,
                                }}></Box>
                                <Box component={'span'} sx={{
                                    color: ColorPallete.Color.Black,
                                    fontSize: "12px", marginLeft: "5px"
                                }} dangerouslySetInnerHTML={{
                                    __html: `${data.consumerFirstName} ${data.consumerLastName}`,
                                }}></Box>

                            </Box>
                            <Box sx={{
                                color: ColorPallete.Text.Secondary,
                                fontSize: "12px"
                            }} dangerouslySetInnerHTML={{
                                __html: `Completed By: ${data.agentName}`,
                            }}></Box>
                        </Box>
                        <Box component={'div'} sx={{
                            color: ColorPallete.Text.Secondary,
                            fontSize: "12px",
                            marginLeft: "10px"
                        }} dangerouslySetInnerHTML={{
                            __html: data.note,
                        }}></Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    )
}