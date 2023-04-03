import * as React from 'react';
import { connect } from 'react-redux';
import { DynamicTable } from '@oasis/react-core';
import { TableHeaders } from './ViewEmail.Data';
import {
  refactorComaker,
  refactorConsent,
  refactorDefault,
  refactoredSource
} from '../../../../../Common/commonfunctions';
import { restructureArray } from '../../../../../Common/restructureData.js';

function ViewEmail(props) {
  const [emailAdddressData, setEmailAddressData] = React.useState([]);

  React.useEffect(() => {
    if (props.emailData?.length > 0) {
      const data = restructureArray(props.emailData, TableHeaders, true).map((da) => {
        const isEmailTypeExist = props.emailTypes.some((type) => da.emailType == type.id);
        let jsonEmailTypeVal = '';
        if (isEmailTypeExist) {
          const emailTypeVal = props.emailTypes.find((type) => da.emailType == type.id);
          jsonEmailTypeVal =
            emailTypeVal.name == 'HomeEmail' ? 'Personal' : emailTypeVal.name.replace('Email', '');
        } else {
          jsonEmailTypeVal = 'N/A';
        }

        let temp = {
          ...da,
          emailType: jsonEmailTypeVal
        };

        /////SET TABLE ROW ACTIONS
        temp.actions = props.menuItems;
        temp.data = props.data;

        if (props.consumerDemographicSource) {
          temp = refactoredSource(
            props.consumerDemographicSource,
            da.emailConsentSource,
            'emailConsentSource',
            temp
          );
        }

        //modifying comaker
        temp = refactorComaker(temp.emailConsentSource, 'emailConsentSource', temp);

        //emailConsent adding emailConsentDate
        temp = refactorConsent(da.emailConsent, 'emailConsent', da.emailConsentDate, temp);

        //esignConsent adding esignConsentDate
        temp = refactorConsent(da.esignConsent, 'esignConsent', da.esignConsentDate, temp);

        //isDefault
        temp = refactorDefault(da.isDefault, 'isDefault', temp);

        return temp;
      });
      setEmailAddressData(data);
    } else {
      setEmailAddressData([]);
    }
  }, [props.emailData]);

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
        rows={emailAdddressData}
        showActions={props.consumerSkipVerification || props.consumerVerification ? true : false}
        actions={props.actions}
        onRowAction={props.handleClick}
        showPaging={false}
        showFilter={props.consumerSkipVerification || props.consumerVerification ? true : false}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    emailData: state.ContactInfoReducer.emailData,
    emailTypes: state.ContactInfoReducer.emailTypes,
    responsibleId: state.ConsumerDetailsReducer.responsibleId,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerDemographicSource: state.StaticDataReducer.consumerDemographicSource
  };
}

export default connect(mapStateToProps, null)(ViewEmail);
