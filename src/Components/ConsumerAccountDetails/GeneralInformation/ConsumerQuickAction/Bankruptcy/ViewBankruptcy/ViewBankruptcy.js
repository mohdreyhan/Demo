import * as React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@oasis/react-core';
import { restructureArray,matchAddressSet, returnValueOrDefault, formatPhoneNumber } from '../../../../../Common/commonfunctions';
import useStyles from '../../../PersonalDetails/PersonalDetails.style.js';
import { bankruptcyInfo, courtInfo, trusteeInfo } from './ViewBankruptcy.data.js';

const type ='USA';
const getValue = (bankruptcyTypes, accessor, value) => {
  if (accessor === 'bankruptcyTypeId') {
    return bankruptcyTypes.find(f => f.id === value)?.shortened
  }

  return value || ''
}
const ViewBankruptcy = (props) => {
  const { bankruptcyInformation } = props
  const styles = useStyles()
  const [bankruptcytData, setbankruptcyData] = React.useState([]);
  const [courtData, setcourtData] = React.useState({});
  const [trusteeData, settrusteeData] = React.useState({});

  const getPhoneNumber = (phoneNumber) => {
    if(phoneNumber)
    {
  if(phoneNumber.endsWith(','))
  return `${formatPhoneNumber(type,phoneNumber.replace(',', ''))}`
  else if (phoneNumber.includes(','))
  {
    const phoneNo= formatPhoneNumber(type,phoneNumber.slice(0,10));
    return phoneNo + ', ' + phoneNumber.slice(11)
  }
    return formatPhoneNumber(type,phoneNumber);
}
return '';
  }
  React.useEffect(() => {
    if (bankruptcyInformation.length >0) {
     const trusteeName = returnValueOrDefault(bankruptcyInformation[0].trusteeInformation.firstName,'')+ ' ' +
                         returnValueOrDefault(bankruptcyInformation[0].trusteeInformation.lastName, '');

      setbankruptcyData(bankruptcyInformation[0]);
      setcourtData({...bankruptcyInformation[0].courtInformation,
                  address:matchAddressSet({
                    ...bankruptcyInformation[0].courtInformation,
                    state: props.statesData.find(s => s.id === bankruptcyInformation[0].courtInformation.stateId)?.displayName
                  }, ', '),
                phones:getPhoneNumber(bankruptcyInformation[0].courtInformation.phone)});
      settrusteeData({...bankruptcyInformation.trusteeInformation,
                    address:matchAddressSet({
                      ...bankruptcyInformation[0].trusteeInformation,
                      state: props.statesData.find(s => s.id === bankruptcyInformation[0].trusteeInformation.stateId)?.displayName
                    }, ', '),
                    name:trusteeName,
                    phones: getPhoneNumber(bankruptcyInformation[0].trusteeInformation.phone)});
      
    }
  }, [bankruptcyInformation]);

  return (
    <>
      <Grid container style={{ padding: '0px 24px 24px' }}>
        {restructureArray([bankruptcytData], bankruptcyInfo).map((consumerDemographicsData) =>
          bankruptcyInfo.map((data, index) => {
            return (
              <Grid item xs={4} key={`${data.id}_${data.accessor}`} style={{ marginTop: '24px' }}>
                <div className={styles.consumerDetailslabel}>{data.label}</div>
                <div className={styles.consumerDetailsAccessor}>
                  {getValue(props.bankruptcyTypes, data.accessor, consumerDemographicsData[data.accessor])}
                </div>
              </Grid>
            );
          })
        )}
      </Grid>
      <div className={styles.consumerDetailsTitle} style={{ marginLeft: '24px', marginTop: 0 }}>Court Information</div>
      <Grid container style={{ padding: '0px 24px 24px', marginTop: '-20px' }}>
        {restructureArray([courtData], courtInfo).map((consumerDemographicsData) =>

          courtInfo.map((data, index) => {
            return (
              <Grid item xs={4} key={`${data.id}_${data.accessor}`} style={{ marginTop: '24px' }}>
                <div
                  className={
                    data.label == 'Type' ? styles.aliasLabel : styles.consumerDetailslabel 
                  } style={{wordWrap: 'break-word'}}>
                  {data.label}
                </div>
                <div
                  className={
                    data.label == 'Type' ? styles.aliasAccessor :styles.consumerDetailsAccessor 
                    
                  } style={{wordWrap: 'break-word'}}>
                  {consumerDemographicsData[data.accessor] ?? ''}
                </div>
              </Grid>
            );
          })
        )}
      </Grid>
      <div className={styles.consumerDetailsTitle} style={{ marginLeft: '24px', marginTop: 0 }}>Trustee Information</div>
      <Grid container style={{ padding: '0px 24px 24px', marginTop: '-20px' }}>
        {restructureArray([trusteeData], trusteeInfo).map((consumerDemographicsData) =>
          trusteeInfo.map((data, index) => {
            return (
              <Grid item xs={4} key={`${data.id}_${data.accessor}`} style={{ marginTop: '24px' }}>
                <div
                  className={
                    data.label == 'Type' ? styles.aliasLabel : styles.consumerDetailslabel
                  }>
                  {data.label}
                </div>
                <div
                  className={
                    data.label == 'Type' ? styles.aliasAccessor : styles.consumerDetailsAccessor
                  } style ={{ overflowWrap:data.label=='Address'?'break-word':'initial',marginRight:16}}>
                  {consumerDemographicsData[data.accessor] ?? ''}
                </div>
              </Grid>
            );
          })
        )}
      </Grid>
    </>

  )
}
function mapStateToProps(state) {
  return {
    bankruptcyTypes: state.StaticDataReducer.bankruptcyTypes,
    statesData: state.StaticDataReducer.getstates,
    bankruptcyInformation: state.ConsumerQuickActionsReducer.bankruptcyInformation
  };
}
export default connect(mapStateToProps, null)(ViewBankruptcy);