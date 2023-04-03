import * as React from 'react';
import { connect } from 'react-redux';
import {
  GETLITIGIOUS,
  GETINCARCERATIONINFORMATION,
  GETDECEASEDINFORMATION,
  GETDISPUTEINFORMATION,
  GETCOMPLAINTINFORMATION,
  GETBANKRUPTCYINFORMATION
} from '../../../../Actions/ConsumerDetails/ConsumerQuickActions/ActionCreators.js';
import Incarceration from './Incarceration/Incarceration.js';
import Litigious from './Litigious/Litigious.js';
import Dispute from './Dispute/Dispute.js';
import Deceased from '../../../BusinessProcess/DeceasedForm/Deceased';
import Bankruptcy from './Bankruptcy/Bankruptcy.js';
import Complaints from './Complaints/Complaints.js';

function ConsumerQuickActions(props) {
  React.useEffect(() => {
    if (props.consumerDemographics.length > 0) {
      if (props.consumerDemographics[0]?.isLitigious) {
        props.GETLITIGIOUS(localStorage.getItem('customerId'));
      }
      if (props.consumerDemographics[0]?.isIncarcerated) {
        props.GETINCARCERATIONINFORMATION(localStorage.getItem('customerId'));
      }
      if (props.consumerDemographics[0]?.isDeceased) {
        props.GETDECEASEDINFORMATION(localStorage.getItem('customerId'));
      }
    }
  }, [props.consumerDemographics]);

  React.useEffect(() => {
    if (props.dependentsOfResponsible?.length > 0) {
      const responsible = props.dependentsOfResponsible.find(
        (dependent) => dependent.id == localStorage.getItem('responsibleId')
      );
      if ('isDisputed' in responsible && responsible.isDisputed) {
        props.GETDISPUTEINFORMATION(localStorage.getItem('responsibleId'));
      }
      if ('hasComplaint' in responsible && responsible.hasComplaint) {
        props.GETCOMPLAINTINFORMATION(localStorage.getItem('responsibleId'));
      }
      if ('isBankrupted' in responsible && responsible.isBankrupted) {
        props.GETBANKRUPTCYINFORMATION(localStorage.getItem('responsibleId'))
      }
    }
  }, [props.dependentsOfResponsible]);
  
  return (
    <>
      <Deceased />
      <Incarceration />
      <Litigious />
      <Dispute />
      <Bankruptcy />
      <Complaints />
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
    dependentsOfResponsible: state.ConsumerQuickActionsReducer.dependentsOfResponsible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETLITIGIOUS: async (customerId) => {
      await dispatch(GETLITIGIOUS(customerId));
    },
    GETINCARCERATIONINFORMATION: async (customerId) => {
      await dispatch(GETINCARCERATIONINFORMATION(customerId));
    },
    GETDECEASEDINFORMATION: async (customerId) => {
      await dispatch(GETDECEASEDINFORMATION(customerId));
    },
    GETDISPUTEINFORMATION: async (responsibleId) => {
      await dispatch(GETDISPUTEINFORMATION(responsibleId));
    },
    GETCOMPLAINTINFORMATION: async (responsibleId) => {
      await dispatch(GETCOMPLAINTINFORMATION(responsibleId));
    },
    GETBANKRUPTCYINFORMATION: async (responsibleId) => {
      await dispatch(GETBANKRUPTCYINFORMATION(responsibleId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerQuickActions);
