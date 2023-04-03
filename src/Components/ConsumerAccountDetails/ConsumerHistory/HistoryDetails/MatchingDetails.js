import { Grid, Box } from "@oasis/react-core";
import { ColorPallete } from "../../../../theme/ColorPallete";

export default function MatchingDetails(props) {
    const { data } = props;
    return (
        <Grid container>
            {data?.map((match) => {
                return (
                    <Grid item xs={6} key={match.key} sx={{ marginBottom: "14px" }}>
                        <Box>
                            <Box sx={{ color: ColorPallete.Text.Primary, fontSize: "12px" }}>{match.label}</Box>
                            <Box sx={{ color: ColorPallete.Color.Black }}>{match?.value ?? ""}</Box>
                        </Box>
                    </Grid>
                )
            })}
        </Grid>
    )
}