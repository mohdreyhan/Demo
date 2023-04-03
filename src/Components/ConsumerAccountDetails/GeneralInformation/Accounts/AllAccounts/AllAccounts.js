import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Paginate from '../../../../Common/AEComponents/Pagination/Paginate.js';
import { TableHeaders } from '../AccountsInSet/AccountsInSetData';
import { returnValueOrDefault, showEmptyTile } from '../../../../Common/commonfunctions.js';
import { restructureArray } from '../../../../Common/restructureData';
import { DynamicTable } from '@oasis/react-core';

function AllAccounts(props) {
  const { menuItems, data } = props;

  const [accountsData, setAccountsData] = useState([]);

  useLayoutEffect(() => {
    if (props.consumerAssocAccounts.length > 0) {
      setAccountsData(props.consumerAssocAccounts);
    }
  }, [props.consumerAssocAccounts]);

  // Adding Relationship type with props.currentRecord

  const getCurrentRecords = (records) => {
    if (records.length > 0) {
      let temp = [];
      restructureArray(records, TableHeaders, true)?.map((account) => {
        let typeFound = false;
        account.actions = menuItems;
        account.data = data;
        props.relationshipTypesData?.forEach((type) => {
          if (type.id == account.responsible.relationshipTypeId) {
            temp.push({
              ...account,
              relationshipType: type.name,
              accountStatus: returnValueOrDefault(account.responsible.statusCode.code, 'N/A'),
              clientname: returnValueOrDefault(account.clientName, 'N/A'),
              creditorName: returnValueOrDefault(account.creditorName, 'N/A'),
              lob: returnValueOrDefault(account.lobName, 'N/A'),
              clientContractID: returnValueOrDefault(account.clientContractId, 'N/A')
            });
            typeFound = true;
          }
        });
        if (!account.responsible.relationshipTypeId || !typeFound) {
          temp.push({
            ...account,
            accountStatus: returnValueOrDefault(account.responsible.statusCode.code, 'N/A'),
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
            consumerAssocAccounts={props.consumerAssocAccounts}
            getCurrentRecords={getCurrentRecords}
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
    consumerAssocAccounts: state.ConsumerDetailsReducer.consumerAssocAccounts
  };
}

export default connect(mapStateToProps)(AllAccounts);
