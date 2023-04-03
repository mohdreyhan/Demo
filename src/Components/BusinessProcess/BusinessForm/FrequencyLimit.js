import { Grid } from "@oasis/react-core";
import useStyles from '../../../Styles/BusinessProcessStyle'
const FrequencyLimit = (props) => {
    const classes = useStyles();
    return (
        <div style={{ paddingLeft: '9px', paddingRight: '9px' }}>
            <Grid container rowSpacing={1}>
                <Grid item xs={12} className={classes.accessDeniedFrequency}>
                    Frequency Failed
                </Grid>
                <Grid item xs={12}>
                    “Sorry, this process cannot be executed at this time. Please try again later.”
                </Grid>
            </Grid>

        </div>)
}
export default FrequencyLimit;

