import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { restructureArray } from '../../../../Common/commonfunctions.js';
import useStyles from '../PersonalDetails.style';

export default function ViewAlias({ consumerAlias, consumerAliasData }) {
  const styles = useStyles();
  return (
    <>
      <div className={styles.consumerDetailsTitle} style={{ padding: "0px 24px"}}>Alias Information</div>
      <Grid container sx={{ padding: '0px 24px 24px'}}>
        {restructureArray(consumerAlias, consumerAliasData).map((alias) =>
          consumerAliasData.map((data, index) => {
            return (
              <Grid item xs={index/2 != 0 ? 5 : 4} key={`alias_${index+1}`} className={styles.individualGridStyle}>
                <div className={styles.consumerDetailslabel}>{data.label}</div>
                <div className={styles.consumerDetailsAccessor}>{alias[data.accessor]}</div>
              </Grid>
            );
          })
        )}
      </Grid>
    </>
  );
}
