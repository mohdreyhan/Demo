import * as React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@oasis/react-core';
import { restructureArray } from '../../../../../Common/commonfunctions';
import useStyles from '../../../PersonalDetails/PersonalDetails.style.js';
import { viewDisputeData } from './ViewDispute.Data.js';

const getmodifiedValue = (accessor, value, disputeReasons=[]) => {
  if(accessor == "reasonId") {
    return disputeReasons.find(reason => reason.id == value)?.description
  }
  return value;
}

const ViewDispute = (props) => {
  const styles = useStyles();
  return (
    <>
      <Grid container style={{ padding: '0px 24px 24px' }}>
        {restructureArray(props.disputeInformation, viewDisputeData).map((info) =>
          viewDisputeData.map((data) => {
            return (
              <Grid
                item
                xs={4}
                key={data.id}
                style={{ marginTop: '24px', wordBreak: 'break-word' }}>
                <div className={styles.consumerDetailslabel}>{data.label}</div>
                <div className={styles.consumerDetailsAccessor}>{getmodifiedValue(data.accessor, info[data.accessor], props.disputeReasons)}</div>
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
    disputeInformation: state.ConsumerQuickActionsReducer.disputeInformation,
    disputeReasons: state.StaticDataReducer.disputeReasons
  };
}

export default connect(mapStateToProps, null)(ViewDispute);
