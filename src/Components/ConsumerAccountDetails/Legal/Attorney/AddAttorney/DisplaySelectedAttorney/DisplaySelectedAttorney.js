import * as React from 'react';
import { Grid, Box } from '@oasis/react-core';
import { SelectedAttorneyData } from './DisplaySelectedAttorney.Data.js';
import useStyles from './DisplaySelectedAttorney.style.js';
import { formatPhoneNumber } from '../../../../../Common/commonfunctions';

function DisplaySelectedAttorney(props) {
  const styles = useStyles();
  const { searchClick } = props;
  const [attorneyInformation, setattorneyInformation] = React.useState([]);

  React.useEffect(() => {
    if (searchClick.length > 0) {
      setattorneyInformation({
        attorneyName: searchClick[0]?.name ?? '',
        firmName: searchClick[0]?.firmName ?? '',
        contactName: `${searchClick[0]?.contactFirstName ?? ''} ${
          searchClick[0]?.contactLastName ?? ''
        }`,
        address: `${searchClick[0]?.addressLine1 ?? ''} ${searchClick[0]?.addressLine2 ?? ''}`,
        mobileNumber: formatPhoneNumber('USA', searchClick[0]?.mobileNumber) ?? '',
        officeNumber: formatPhoneNumber('USA', searchClick[0]?.officePhoneNumber) ?? '',
        faxNumber: formatPhoneNumber('USA', searchClick[0]?.faxNumber) ?? '',
        emailAddress: searchClick[0]?.email ?? '',
        barNumber: searchClick[0]?.barCode ?? ''
      });
    }
  }, [searchClick]);

  return (
    <Box className={styles.layout}>
      {' '}
      <Grid container spacing={4}>
        {SelectedAttorneyData.map((data, index) => {
          return (
            <Grid item xs={4} key={`${data.id}_${index+1}`}>
              <div className={styles.label}>{data.label}</div>
              <div className={styles.value}>{attorneyInformation[data.accessor]}</div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default DisplaySelectedAttorney;
