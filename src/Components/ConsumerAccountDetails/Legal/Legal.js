import * as React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GETASSIGNEDATTORNEYS } from '../../../Actions/ConsumerDetails/Legal/ActionCreators';
import Attorney from './Attorney/Attorney';


function Legal(props) {
  const navigation = useNavigate();

  React.useEffect(() => {
    if(props.consumerDemographics.length == 0) {
      navigation("/consumer")
    }
    props.GETASSIGNEDATTORNEYS(localStorage.getItem("responsibleId"))
  }, []);

  return (
    <>
      <Attorney />
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerDemographics: state.ConsumerDetailsReducer.consumerDemographics,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETASSIGNEDATTORNEYS: async (responsibleId) => {
      await dispatch(GETASSIGNEDATTORNEYS(responsibleId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Legal);