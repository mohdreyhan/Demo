import React from 'react'
import { Box, Grid, Typography, HistoryIcon, MuiButton } from "@oasis/react-core";
import { ColorPallete } from '../../../theme/ColorPallete';

const ConsumerMatchingCard = (props) => {
    const { data, handleOnClick } = props;
    return (
        <Box component="div" sx={{
            minHeight: "80px", flexGrow: 1,
            border: "1px solid #E0E0DF",
            boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            mt: 1,

        }}>
            <Grid container spacing={2} sx={{
                padding: "0px !important",
                margin: "0px",

            }}>
                <Grid item sx={{
                    padding: "0px !important",
                    margin: "0px",
                    width: "32px",
                }}>
                    <Typography sx={{
                        backgroundColor: ColorPallete.Color.LightBlue,
                        color: ColorPallete.Color.White,
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        borderRadius: "4px 0px 0px 4px",
                        paddingLeft: "4px",

                    }}>
                        <HistoryIcon />
                    </Typography>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction={"column"} sx={{ padding: "0px 8px 8px 0px" }}>
                        <Box component={'div'} sx={{ justifyContent: "space-between", display: "flex", paddingBottom: "10px", }} >
                            <Box >
                                <Box component={"label"} sx={{
                                    fontWeight: 700, fontSize: "14px",
                                    color: ColorPallete.Text.Primary, marginRight: "5px",

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
                        </Box>
                        <Box component={"div"} sx={{ marginLeft: "10px" }}>
                            <Box component={'div'} sx={{ display: "flex", alignItems: "center !important" }}>
                                <Box component={'span'} sx={{
                                    color: ColorPallete.Text.Primary,
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    marginRight: "10px",

                                }} dangerouslySetInnerHTML={{
                                    __html: `${data.creationDateLabel}`,
                                }}></Box>

                                <Box component={'span'} sx={{
                                    fontSize: "12px", color: ColorPallete.Text.Secondary
                                }} dangerouslySetInnerHTML={{
                                    __html: data.creationDateValue,
                                }}></Box>
                            </Box>
                            <Box component={'div'} sx={{ display: "flex", alignItems: "center !important" }}>
                                <Box component={'span'} sx={{
                                    color: ColorPallete.Text.Primary,
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    marginRight: "10px"
                                }} dangerouslySetInnerHTML={{
                                    __html: `${data.accountNoLabel}`,
                                }}></Box>

                                <Box component={'span'} sx={{
                                    fontSize: "12px", color: ColorPallete.Text.Secondary
                                }} dangerouslySetInnerHTML={{
                                    __html: data.accountNoValue,
                                }}></Box>
                            </Box>
                            <Box component={'div'} sx={{ display: "flex", alignItems: "center !important" }}>
                                <Box component={'span'} sx={{
                                    color: ColorPallete.Text.Primary,
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    marginRight: "10px"
                                }} dangerouslySetInnerHTML={{
                                    __html: `${data.consumerNameLabel}`,
                                }}></Box>

                                <Box component={'span'} sx={{
                                    fontSize: "12px", color: ColorPallete.Text.Secondary
                                }} dangerouslySetInnerHTML={{
                                    __html: data.consumerNameValue,
                                }}></Box>
                            </Box>
                            <Box component={'div'} sx={{ display: "flex", alignItems: "center !important", justifyContent: "flex-end" }}>
                                <MuiButton
                                    variant="outlined"
                                    style={{
                                        textTransform: 'none',
                                        padding: "4px 12px",
                                        margin: "0px"
                                    }}
                                    onClick={handleOnClick}
                                >
                                    <div style={{ color: ColorPallete.Button.Secondary, fontSize: "14px", fontWeight: 400 }}>View Details</div>
                                </MuiButton>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>

            </Grid>
        </Box >
    )
}

export default ConsumerMatchingCard