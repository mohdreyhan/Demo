import * as React from 'react';
import { connect } from 'react-redux';
import Paginate from '../../../../Common/AEComponents/Pagination/Paginate.js';
import { TableHeaders } from './Employer.Data';
import { DynamicTable } from '@oasis/react-core';
import { restructureArray } from '../../../../Common/restructureData.js';
import { showEmptyTile } from '../../../../Common/commonfunctions.js';

function ViewHistoricalEmployer(props) {
  const { menuItems, data } = props;

  const [consumerData, setConsumerData] = React.useState([]);
  const [inActiveRecords, seInActive] = React.useState([]);

  React.useEffect(() => {
    if (props.consumerEmployers.length > 0) {
      let inActiveRecord = props.consumerEmployers.filter((data) => !data.active);
      seInActive(inActiveRecord);
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
      {inActiveRecords.length > 0 ? (
        <>
          <DynamicTable
            headers={TableHeaders}
            rows={consumerData}
            showActions={true}
            actions={props.actions}
            onRowAction={props.handleClick}
            showPaging={false}
          />
          <Paginate getCurrentRecords={getCurrentRecords} consumerAssocAccounts={inActiveRecords} />
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

export default connect(mapStateToProps, null)(ViewHistoricalEmployer);
