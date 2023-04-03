import { Grid } from "@oasis/react-core";
import useStyles from '../../Styles/BusinessProcessStyle'
const AccessDeniedPopup = (props) => {
    const classes = useStyles();
    const { actionType } = props;

    const noAccessTitle = () => {
        if (props.noAccessTitle) {
            return (<div style={{ display: "block", paddingTop: '8px' }} dangerouslySetInnerHTML={{ __html: props.noAccessTitle?.replace(/href/g, "target='_black' href") }}></div>);
        }
        return (<div className={classes.accessDenied}>Access Denied</div>);
    }
    const noAccessText = () => {
        if (props.noAccessText) {
            return (<div style={{ display: "block", paddingBottom: "33px" }} dangerouslySetInnerHTML={{ __html: props.noAccessText?.replace(/href/g, "target='_black' href") }}></div>);
        }
        return (<div style={{ paddingBottom: "33px" }}>Please contact administrator for access.</div>);
    }
    const noAccessTextContent = () => {
        if (props.noAccessText) {
            return (<div style={{ fontSize: "14px", paddingTop: '6px', paddingBottom: "33px" }} dangerouslySetInnerHTML={{ __html: props.noAccessText?.replace(/href/g, "target='_black' href") }}></div>);
        }
        return (<div style={{ fontSize: "14px", paddingTop: '6px', paddingBottom: "33px" }}>You do not have access to complete this Step. Please speak to the manager.</div>);
    }
    return (
        <div style={{ paddingLeft: '9px', paddingRight: '9px' }}>
            {actionType == 'unauthorized' ? (
                <div style={{ fontSize: "14px" }}>
                    <Grid container rowSpacing={1}>
                        <Grid item xs={12} >{noAccessTitle()}</Grid>
                        <Grid item xs={12}>{noAccessText()}</Grid>
                    </Grid>
                </div>)
                : (<Grid container>
                    {noAccessTextContent()}
                </Grid>)
            }
        </div>)
}
export default AccessDeniedPopup;

