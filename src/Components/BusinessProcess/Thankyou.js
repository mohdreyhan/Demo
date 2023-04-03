import { Grid } from '@oasis/react-core'
import React from 'react'
import { ColorPallete } from '../../theme/ColorPallete'
import { connect } from "react-redux";
import { extractImagePath } from '../Common/commonfunctions';

const Thankyou = (props) => {

    const [name, setName] = React.useState()

    React.useEffect(() => {
        if (props.consumerDemographics) {
            setName(`${props?.consumerDemographics?.[0]?.firstName} ${props?.consumerDemographics?.[0]?.lastName}`);
        }
    }, [props.consumerDemographics]);

    return (
        <Grid container>
            <Grid
                item
                xs={12}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "12px 0px 16px 0px"
                }}
            >
                <div
                    style={{
                        backgroundColor: ColorPallete.Color.lightGreen,
                        width: "132px",
                        height: "132px",
                        borderRadius: "50%",
                    }}
                >
                    <div style={{
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <img src={extractImagePath("Thankyou.png")} />
                    </div>
                </div>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "700",
                    color: ColorPallete.Text.Tertiary,
                    marginBottom: "7px"
                }}
            >
                {`Thank you ${name}!`}
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "28px"
                }}
            >
                You've successfully finished your Business Process.
            </Grid>
        </Grid>
    )
}

function mapStateToProps(state) {
    return {
        consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    };
}

export default connect(
    mapStateToProps
)(Thankyou);
