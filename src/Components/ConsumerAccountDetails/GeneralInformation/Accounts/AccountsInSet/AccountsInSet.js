import { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { TableHeaders } from './AccountsInSetData';
import { returnValueOrDefault, showEmptyTile } from '../../../../Common/commonfunctions.js';
import Paginate from '../../../../Common/AEComponents/Pagination/Paginate.js';
import { restructureArray } from '../../../../Common/restructureData';
import { DynamicTable } from '@oasis/react-core';

function AccountsInSet(props) {
  const { menuItems, data } = props;

  const [accountsData, setAccountsData] = useState([]);

  useLayoutEffect(() => {
    if (props.currentaccountset.length > 0) {
      addDataInCurrentRecords(props.currentaccountset);
    }
  }, [props.currentaccountset]);

  // Adding Relationship type with props.currentRecord

  const addDataInCurrentRecords = (records) => {
    if (records.length > 0) {
      let temp = [];
      restructureArray(records, TableHeaders, true)?.map((account) => {
        account.actions = menuItems;
        account.data = data;
        let typeFound = false;
        props.relationshipTypesData?.forEach((type) => {
          if (type.id == account.responsible?.relationshipTypeId) {
            temp.push({
              ...account,
              relationshipType: type.name,
              accountStatus: returnValueOrDefault(account.responsible?.statusCode?.code, 'N/A'),
              clientname: returnValueOrDefault(account.clientName, 'N/A'),
              creditorName: returnValueOrDefault(account.creditorName, 'N/A'),
              lob: returnValueOrDefault(account.lobName, 'N/A'),
              clientContractID: returnValueOrDefault(account.clientContractId, 'N/A')
            });
            typeFound = true;
          }
        });
        if (!account.responsible?.relationshipTypeId || !typeFound) {
          temp.push({
            ...account,
            accountStatus: returnValueOrDefault(account.responsible?.statusCode?.code, 'N/A'),
            clientname: returnValueOrDefault(account.clientName, 'N/A'),
            creditorName: returnValueOrDefault(account.creditorName, 'N/A'),
            lob: returnValueOrDefault(account.lobName, 'N/A'),
            clientContractID: returnValueOrDefault(account.clientContractId, 'N/A')
          });
        }
        return temp;
      });
      setAccountsData(temp);
    }
  };

  return (
    <>
      {accountsData.length > 0 ? (
        <>
          <DynamicTable
            headers={TableHeaders}
            rows={accountsData}
            showActions={true}
            actions={props.actions}
            onRowAction={props.handleClick}
            showPaging={false}
          />
          <Paginate
            consumerAssocAccounts={props.currentaccountset}
            getCurrentRecords={addDataInCurrentRecords}
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
    relationshipTypesData: state.ConsumerDetailsReducer.relationshipTypesData,
    currentAccountNumber: state.ConsumerDetailsReducer.currentAccountNumber,
    currentaccountset: state.ConsumerDetailsReducer.currentaccountset
  };
}

export default connect(mapStateToProps)(AccountsInSet);
