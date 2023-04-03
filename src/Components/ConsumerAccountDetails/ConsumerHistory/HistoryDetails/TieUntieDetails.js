import { Grid, Box } from "@oasis/react-core";
import { ColorPallete } from "../../../../theme/ColorPallete";

export default function TieUntieDetails(props) {

    return (
        <Grid container >
            {props.data?.map((data) => {
                return (
                    <Grid item xs={data.xs} key={data.key} sx={{ marginBottom: "23px" }}>
                        <Box key ="tieUntie">
                        <Box>
                            <Box sx={{ color: ColorPallete.Text.Primary, fontSize: "12px" }}>{data.label}</Box>
                            <Grid container style={data.label=='Tied To' ? {height: '100px', overflowX: 'auto'} : {}}>
                            {Array.isArray(data?.value) ?
                               (data.value).map((tieData) => {
                                    return<Grid key={data.key+1} item xs={2.4} sx={{ color: ColorPallete.Color.Black }}>
                                        {"AC: " + tieData ?? ""}
                                    </Grid>
                                })
                                : <Box sx={{ color: ColorPallete.Color.Black }}>{data?.value ?? ""}</Box>
                            }</Grid>
                        </Box>
                    </Box>
                </Grid>)
            })}
        </Grid>
        
    )
}