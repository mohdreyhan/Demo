import * as React from 'react';
import { connect } from 'react-redux';
import { Stack, Loader } from '@oasis/react-core';
import { TableHeaders } from './ViewHistoricalAttorney.Data';
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
  const addressResult = matchAddressSet(temp, ',');
  temp.address = addressResult ? addressResult : '';
  Object.keys(temp).forEach((key) => (temp[key] === '') ? temp[key] == 'N/A' : temp[key]);
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

function ViewHistoricalAttorney(props) {
  const [inactiveRecords, setInactiveRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const useStyles = {
    TableContainer: {
      minHeight: '233px',
      maxHeight: '233px',
      overflowY: 'auto'
    },
    firstChild: {
      height: '40px !important',
      left: 'unset',
      boxShadow: 'unset !important',
    },
    others: {
      tableHeaderTableCell: {
        padding: '5px 19px',
        position: 'sticky',
        boxShadow: 'unset',
        right: 'unset',
      },
      tableBodyTableCell: {
        padding: '8px 19px',
        position: 'unset',
        right: 'unset',
        boxShadow: 'unset'
      }
    }
  };

  React.useEffect(() => {
    if (props.assignedAttorneys?.length > 0 && props.getStates?.length > 0) {
      ////////////// GET ACTIVE RECORDS
      const records = props.assignedAttorneys.filter((data) => data.historical);
      const modifiedData = restructureArray(records, TableHeaders).map((restructuredData) => {
        let temp = { ...restructuredData };
        modifyAttorneyName(temp, temp.firstName, temp.lastName, 'attorneyFullName');
        modifyAttorneyName(temp, temp.contactFirstName, temp.contactLastName, 'contactFullName');
        modifyAddress(temp, props.getStates);
        return temp;
      });

      ////SET MODIFIED
      setTimeout(() => {
        setInactiveRecords(modifiedData);
        setLoading(false);
      }, 3000);
    } else {
      setInactiveRecords([]);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [props.assignedAttorneys, props.getStates]);

  if (loading) {
    return <Loader />;
  } else {
    if (inactiveRecords.length > 0) {
      return (
        <>
          <AETable
            tableHeaders={TableHeaders}
            currentRecords={inactiveRecords}
            handleClick={props.handleClick}
            showMoreButton="false"
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
            }}>{`No Historical Attorney available`}</div>
        </Stack>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    assignedAttorneys: state.LegalReducer.assignedAttorneys,
    getStates: state.StaticDataReducer.getstates
  };
}

export default connect(mapStateToProps, null)(ViewHistoricalAttorney);
