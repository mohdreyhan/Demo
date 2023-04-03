import * as React from 'react';
import { connect } from 'react-redux';
import { Stack, Loader } from '@oasis/react-core';
import { TableHeaders } from './ViewCurrentAttorney.Data';
import AETable from '../../../../../Common/AEComponents/Table/AETable';
import { ColorPallete } from '../../../../../../theme/ColorPallete';
import { matchAddressSet, restructureArray } from '../../../../../Common/commonfunctions';

const modifyAddress = (temp, states) => {
  states.forEach((state) => {
    if (temp.countryId === state.country.id) {
      temp.country = state.country.name;
    }
    if (temp.stateId === state.id) {
      temp.state = state.name;
    }
  });
  const addressResult=matchAddressSet(temp, ',')
  temp.address = addressResult?addressResult: '';
  return temp;
};

const modifyAttorneyName = (data, column1, column2, extraColumn) => {
  if (column1 && column2) {
    data[extraColumn] = column1 + ' ' + column2;
  } else if (column1 && !column2) {
    data[extraColumn] = column1;
  } else if (!column1 && column2) {
    data[extraColumn] = column2;
  } else {
    data[extraColumn] = 'N/A';
  }
  return data;
};


function ViewCurrentAttorney(props) {
  const [activeRecords, setActiveRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const useStyles = {
    TableContainer: {
      minHeight: '233px',
      maxHeight: '233px',
      overflowY: 'auto'
    },
    spinner: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 70
    },
    firstChild: {
      left: 'unset',
      boxShadow: 'unset !important'
    },
    lastChild: {
      padding: 'unset',
      right: 'unset'
    }
  };

  React.useEffect(() => {
    if (props.assignedAttorneys?.length > 0 || props.getStates?.length > 0) {
      ////////////// GET ACTIVE RECORDS
      const records = props.assignedAttorneys.filter((data) => !data.historical);

      const modifiedData = restructureArray(records, TableHeaders, true).map((restructuredData) => {
        let temp = { ...restructuredData };
        modifyAttorneyName(temp, temp.firstName, temp.lastName, 'attorneyFullName');
        modifyAttorneyName(temp, temp.contactFirstName, temp.contactLastName, 'contactFullName');
        modifyAddress(temp, props.getStates);
       Object.keys(temp).forEach((key) => (temp[key] === '') ? temp[key] == 'N/A' : temp[key]);
        return temp;
      });

   
      ////SET MODIFIED
      setTimeout(() => {
        setActiveRecords(modifiedData);
        setLoading(false);
      }, 1000);
    } else {
      setActiveRecords([]);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [props.assignedAttorneys, props.getStates]);

  const attorneyData = () => {
    if (props.assignedAttorneyFlag.length > 0 && props.assignedAttorneyFlag.some(attorney => attorney.toBeAssigned))
      return (
        <Stack sx={{ fontWeight: 'bold', alignItems: 'center', fontSize: '12px' }}>
          <span> Attorney Assigned. </span>
          <span>Add attorney details.</span>
        </Stack>
      );
    else return <div>No Attorney Assigned</div>;
  };

  if (loading) {
    return <Loader />;
  } else {
    if (activeRecords.length > 0) {
      return (
        <>
          <AETable
            tableHeaders={TableHeaders}
            currentRecords={activeRecords}
            handleClick={props.handleClick}
            data={props.data}
            styles={useStyles}
            applyMakeStyles={true}
          />
        </>
      );
    } else {
      return (
        <Stack sx={{ alignItems: 'center', padding: '30px' }}>
          <div
            style={{
              paddingTop: '10px',
              fontSize: '12px',
              color: ColorPallete.Border.Grid,
              fontWeight: 'bold'
            }}>
            {attorneyData()}
          </div>
        </Stack>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    assignedAttorneys: state.LegalReducer.assignedAttorneys,
    getStates: state.StaticDataReducer.getstates,
    assignedAttorneyFlag: state.LegalReducer.assignedAttorneyFlag
  };
}

export default connect(mapStateToProps, null)(ViewCurrentAttorney);
