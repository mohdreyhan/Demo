import * as React from 'react';
import { Grid } from '@oasis/react-core';
import { connect } from 'react-redux';
import { formatPhoneNumber, matchAddressSet, restructureArray } from '../../../Common/commonfunctions.js';
import { ConsumerDeceasedData, CourtData, ExecutorData } from './DeceasedView.Data';
import useStyles from './DeceasedDetails.style';

const type = 'USA';

function DeceasedView(props) {
  const { deceasedInfo, statesData, deceasedInformation } = props;
  const styles = useStyles();
  const [consumerDeceasedInfo, setConsumerDeceasedInfo] = React.useState([]);
  const [courtInfoInfo, setcourtInfoInfo] = React.useState([]);
  const [executorInfo, setexecutorInfo] = React.useState([]);
  const getPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      if (phoneNumber.endsWith(','))
        return `${formatPhoneNumber(type, phoneNumber.replace(',', ''))}`
      else if (phoneNumber.includes(',')) {
        const phoneNo = formatPhoneNumber(type, phoneNumber.slice(0, 10));
        return phoneNo + ', ' + phoneNumber.slice(11)
      }
      return formatPhoneNumber(type, phoneNumber);
    }
    return ''
  }
  React.useEffect(() => {
    if (deceasedInfo && deceasedInfo.length > 0) {
      const consumerAddress = matchAddressSet({ ...deceasedInfo[0], state: getState(deceasedInfo[0].stateRefId) }, ',');
      const consumerInfoObj = Object.assign({ ...deceasedInfo?.[0] }, { address: consumerAddress })
      setConsumerDeceasedInfo([consumerInfoObj]);
      const courtAddress = matchAddressSet({ ...deceasedInfo[0].courtInformation, state: getState(deceasedInfo[0].courtInformation.stateRefId) }, ',');
      const courtInfoObj = Object.assign({ ...deceasedInfo?.[0]?.courtInformation, phone: getPhoneNumber(deceasedInfo?.[0]?.courtInformation?.phone)  }, { address: courtAddress })
      setcourtInfoInfo([courtInfoObj]);
      const executorName = `${deceasedInfo[0].executor.firstName || ''} ${deceasedInfo[0].executor.lastName || ''}`.trim();
      const executorAddress = matchAddressSet({ ...deceasedInfo[0].executor, state: getState(deceasedInfo[0].executor.stateRefId) }, ',');
      const executorObj = Object.assign({ ...deceasedInfo?.[0]?.executor, phoneNumber: getPhoneNumber(deceasedInfo?.[0]?.executor?.phoneNumber) }, { name: executorName, address: executorAddress });
      setexecutorInfo([executorObj]);
    }
  }, [deceasedInformation])

  const getState = (stateId) => {
    if (Array.isArray(statesData))
      return statesData.find(state => state.id === stateId)?.displayName
    return ''
  }
  return (
    <>
      {props.consumerDemographics[0]?.isDeceased && (
        <>
          <Grid container style={{ padding: '0px 24px 24px' }}>
            {restructureArray(consumerDeceasedInfo, ConsumerDeceasedData).map(
              (consumerDemographicsData) =>
                ConsumerDeceasedData.map((data, index) => {
                  return (
                    <Grid item xs={4} key={data.id} style={{ marginTop: '24px', wordBreak: 'break-word' }}>
                      <div className={styles.consumerDetailslabel}>{data.label}</div>
                      <div className={styles.consumerDetailsAccessor}>
                        {consumerDemographicsData[data.accessor] != null
                          ? consumerDemographicsData[data.accessor]
                          : ''}
                      </div>
                    </Grid>
                  );
                })
            )}
          </Grid>
          {/* Court Information */}
          <div
            style={{
              paddingLeft: '24px',
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '14px',
            }}>
            Court Information
          </div>
          <Grid container style={{ padding: '0px 24px 24px' }}>
            {restructureArray(courtInfoInfo, CourtData).map(
              (courtStructuredData) =>
                CourtData.map((data, index) => {
                  return (
                    <Grid item xs={4} key={data.id} style={{ marginTop: '24px', wordBreak: 'break-word' }}>
                      <div className={styles.consumerDetailslabel}>{data.label}</div>
                      <div className={styles.consumerDetailsAccessor} style={data.accessor === 'address' ? { maxWidth: '90%' } : {}}>
                        {courtStructuredData[data.accessor] != null
                          ? courtStructuredData[data.accessor]
                          : ''}
                      </div>
                    </Grid>
                  );
                })
            )}
          </Grid>
          {/* executor info */}
          <div
            style={{
              paddingLeft: '24px',
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '14px',
            }}>
            Executor Information
          </div>
          <Grid container style={{ padding: '0px 24px 24px' }}>
            {restructureArray(executorInfo, ExecutorData).map(
              (executorStructuredData) =>
                ExecutorData.map((data, index) => {
                  return (
                    <Grid item xs={4} key={data.id} style={{ marginTop: '24px', wordBreak: 'break-word' }}>
                      <div className={styles.consumerDetailslabel}>{data.label}</div>
                      <div className={styles.consumerDetailsAccessor}>
                        {executorStructuredData[data.accessor] != null
                          ? executorStructuredData[data.accessor]
                          : ''}
                      </div>
                    </Grid>
                  );
                })
            )}
          </Grid>
        </>
      )
      }

    </>
  )
}

function mapStateToProps(state) {
  return {
    deceasedInfo: state.ConsumerDetailsReducer.deceasedInfo,
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    deceasedInformation: state.ConsumerQuickActionsReducer.deceasedInformation,
    statesData: state.StaticDataReducer.getstates,
  }
}
export default connect(mapStateToProps, null)(DeceasedView);
