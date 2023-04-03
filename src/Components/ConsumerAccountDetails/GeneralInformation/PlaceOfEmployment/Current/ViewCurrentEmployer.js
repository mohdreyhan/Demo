import * as React from 'react';
import { connect } from 'react-redux';
import Paginate from '../../../../Common/AEComponents/Pagination/Paginate.js';
import { DynamicTable } from '@oasis/react-core';
import { TableHeaders } from './Employer.Data';
import { restructureArray } from '../../../../Common/restructureData.js';
import { showEmptyTile } from '../../../../Common/commonfunctions.js';

function ViewCurrentEmployer(props) {
  const { menuItems, data } = props;

  const [ActiveConsumerData, setActiveConsumerData] = React.useState([]);
  const [consumerData, setConsumerData] = React.useState([]);

  React.useEffect(() => {
    if (props.consumerEmployers.length > 0) {
      let activeRecords = props.consumerEmployers.filter((data) => data.active);
      setActiveConsumerData(activeRecords);
    }
  }, [props.consumerEmployers]);

  const getCurrentRecords = (records) => {
    if (records.length > 0) {
      let modifiedAddress = [];
      restructureArray(records, TableHeaders, true).map((rec, index) => {
        // SET ACTIONS
        rec.actions = menuItems;
        rec.data = data;
        // Concat Address
        const concatAddress = rec.address2 ? rec.address1 + ' ' + rec.address2 : rec.address1;
        // Get Employment Code
        const filteredemploymentCode =
          props.employmentTypes?.find((type) => type.id == rec.employmentTypeId)?.code || 'N/A';
        return modifiedAddress.push({
          ...rec,
          formDataId: index + 1,
          address: concatAddress,
          employmentTypeId: filteredemploymentCode
        }); //Adding and ID explicitly in API response for hover implementation
      });
      if (modifiedAddress.length > 0) {
        setConsumerData(modifiedAddress);
      }
    }
  };

  return (
    <>
      {ActiveConsumerData.length > 0 ? (
        <>
          <DynamicTable
            headers={TableHeaders}
            rows={consumerData}
            showActions={true}
            actions={props.actions}
            onRowAction={props.handleClick}
            showPaging={false}
          />
          <Paginate
            getCurrentRecords={getCurrentRecords}
            consumerAssocAccounts={ActiveConsumerData}
          />
        </>
      ) : (
        <>{showEmptyTile()}</>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    consumerEmployers: state.ConsumerDetailsReducer.consumerEmployers,
    employmentTypes: state.ConsumerDetailsReducer.employmentTypes
  };
}

export default connect(mapStateToProps, null)(ViewCurrentEmployer);
