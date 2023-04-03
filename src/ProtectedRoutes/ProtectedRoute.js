import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ConsumerVerificationDetails from '../Components/ConsumerAccountDetails/ConsumerVerication/ConsumerVerificationDetails';
import { GETSTATES } from '../Actions/StaticData/ActionCreators.js';
import { matchAddressSet } from '../Components/ConsumerAccountDetails/History/AccountHistory.Data.js';
import { zipCodeFormat } from '../Components/Common/commonfunctions';

const getAddress = (props) => {
  const primaryAddress = props?.consumerverifieddetails?.addresses?.filter(
    (data) => data.isDefault
  );
  const primaryEmail = props?.consumerverifieddetails?.emails?.filter((data) => data.isDefault);
  props.consumerverifieddetails.email =
    primaryEmail?.length > 0 ? primaryEmail[0].emailAddress : '';

  props.consumerverifieddetails.name = `${props.consumerverifieddetails['firstName'] ?? ''} ${
    props.consumerverifieddetails['middleName'] ?? ''
  } ${props.consumerverifieddetails['lastName'] ?? ''}`;

  props.statesData.length > 0 &&
    props.statesData.forEach((st) => {
      if (primaryAddress?.length > 0 && primaryAddress[0]?.stateCode == st.id) {
        primaryAddress[0].state = st?.name;
      }
      if (primaryAddress?.length > 0 && primaryAddress[0]?.countryCode == st.country.id) {
        primaryAddress[0].country = st?.country.name;
      }
    });
  props.consumerverifieddetails.primaryAddress = primaryAddress?.length > 0 ? primaryAddress?.[0] : '';
  let address = primaryAddress?.length > 0 ? primaryAddress[0] : {};
  address = {...address, zipCode: zipCodeFormat(address.zipCode) }
  props.consumerverifieddetails.address = matchAddressSet(address, ',');
  return props.consumerverifieddetails;
};

function ProtectedRoute(props) {
  const { Component } = props;
  const [consumerverifieddetails, setconsumerdetails] = useState([]);

  useEffect(() => {
    if (props.statesData.length <= 0) {
      props.GETSTATES();
    }
  }, []);

  useEffect(() => {
    setconsumerdetails(getAddress(props));
  }, [props.consumerverifieddetails]);

  if (!props.consumerVerification && !props.consumerSkipVerification) {
    return <ConsumerVerificationDetails consumerverifieddetails={consumerverifieddetails} />;
  } else if (props.consumerVerification || props.consumerSkipVerification) {
    return <Component />;
  }
}

function mapStateToProps(state) {
  return {
    consumerverifieddetails: state.ConsumerDetailsReducer.consumerverifieddetails,
    consumerVerification: state.ConsumerDetailsReducer.consumerVerification,
    consumerSkipVerification: state.ConsumerDetailsReducer.consumerSkipVerification,
    statesData: state.StaticDataReducer.getstates
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETSTATES: async () => {
      await dispatch(GETSTATES());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
