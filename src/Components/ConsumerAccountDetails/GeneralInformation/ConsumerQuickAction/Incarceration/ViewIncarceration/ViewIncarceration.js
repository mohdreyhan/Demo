import * as React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@oasis/react-core';
import { restructureArray } from '../../../../../Common/commonfunctions';
import useStyles from '../../../PersonalDetails/PersonalDetails.style.js';
import { viewIncarcerationData } from "./ViewIncarceration.Data.js";

const ViewIncarceration = (props) => {
  const styles = useStyles();
  const [localIncarcerationInfo, setLocalIncarcerationInfo] = React.useState([]);

  React.useEffect(() => {
    if (props.incarceratedInformation.length > 0) {
      const arr = [...props.incarceratedInformation];
      setLocalIncarcerationInfo(arr);
    }
  }, [props.incarceratedInformation]);

  return (
    <>
      <Grid container style={{ padding: '0px 24px 24px' }}>
        {restructureArray(localIncarcerationInfo, viewIncarcerationData).map((info) =>
          viewIncarcerationData.map((data) => {
            return (
              <Grid
                item
                xs={4}
                key={data.id}
                style={{ marginTop: '24px', wordBreak: 'break-word' }}>
                <div className={styles.consumerDetailslabel}>{data.label}</div>
                <div className={styles.consumerDetailsAccessor}>
                  {info[data.accessor]}
                </div>
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
};

function mapStateToProps(state) {
  return {
    incarceratedInformation: state.ConsumerQuickActionsReducer.incarceratedInformation
  };
}

export default connect(mapStateToProps, null)(ViewIncarceration);
