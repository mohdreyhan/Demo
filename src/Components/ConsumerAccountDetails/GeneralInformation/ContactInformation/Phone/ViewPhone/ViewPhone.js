import * as React from 'react';
import { connect } from 'react-redux';
import { DynamicTable } from '@oasis/react-core';
import { TableHeaders } from './ViewPhone.Data';
import {
  refactorConsent,
  refactorDefault,
  refactorComaker,
  refactoredSource
} from '../../../../../Common/commonfunctions.js';
import { restructureArray } from '../../../../../Common/restructureData.js';

function ViewPhone(props) {
  const [phoneData, setPhoneData] = React.useState([]);

  const useStyles = {
    tableContainer: {
      minHeight: '233px',
      maxHeight: '233px',
      overflowY: 'auto'
    }
  };

  React.useEffect(() => {
    if (props.consumerPhoneData?.length > 0 && props.phoneTypes?.length > 0) {
      let modifiedPhoneData = restructureArray(props.consumerPhoneData, TableHeaders, true).map(
        (phone) => {
          const isPhoneTypeExist = props.phoneTypes.some((type) => phone.type == type.id);
          let jsonPhoneTypeVal = 'N/A';
          if (isPhoneTypeExist) {
            const phoneTypeVal = props.phoneTypes.find((type) => phone.type == type.id);
            jsonPhoneTypeVal = phoneTypeVal.name;
          }
          let temp = {
            ...phone,
            type: jsonPhoneTypeVal
          };

          /////SET TABLE ROW ACTIONS
          temp.actions = props.menuItems;
          temp.data = props.data;

          if (props.consumerDemographicSource) {
            temp = refactoredSource(props?.consumerDemographicSource, phone.source, 'source', temp);
          }

          temp = refactorComaker(temp.source, 'source', temp);

          //Call Consent adding Call ConsentDate
          temp = refactorConsent(phone.callConsent, 'callConsent', phone.callConsentDate, temp);

        //sms Consent adding sms ConsentDate
        temp = refactorConsent(phone.smsConsent, 'smsConsent', phone.smsConsentDate, temp);

        //Call Consent adding pre Recorded Message Consent
        temp = refactorConsent(phone.preRecordedMessageConsent, 'preRecordedMessageConsent', phone.preRecordedMessageConsentDate, temp);

        //sms Consent adding artificial Voice Consent Date
        temp = refactorConsent(phone.artificialVoiceConsent, 'artificialVoiceConsent', phone.artificialVoiceConsentDate, temp);

          //isDefault
          temp = refactorDefault(phone.isDefault, 'isDefault', temp);

          return temp;
        }
      );
      setPhoneData(modifiedPhoneData);
    } else {
      setPhoneData([]);
    }
  }, [props.consumerPhoneData, props.phoneTypes]);

  let headerLength = TableHeaders.length;

  if (!(props.consumerSkipVerification || props.consumerVerification)) {
    const style = {
      header: {
        right: 'unset',
        paddingLeft: '0px',
        zIndex: 0
      }
    };
    TableHeaders[headerLength - 1].style = style;
  } else {
    delete TableHeaders[headerLength - 1].style;
  }

  return (
    <>
      <DynamicTable
        headers={TableHeaders}
        rows={phoneData}
        showActions={props.consumerSkipVerification || props.consumerVerification ? true : false}
        actions={props.actions}
        onRowAction={props.handleClick}
        showPaging={false}
        styles={useStyles}
        showFilter={props.consumerSkipVerification || props.consumerVerification ? true : false}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    phoneTypes: state.ContactInfoReducer.phoneTypes,
    consumerPhoneData: state.ContactInfoReducer.phoneData,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerDemographicSource: state.StaticDataReducer.consumerDemographicSource
  };
}
export default connect(mapStateToProps, null)(ViewPhone);
