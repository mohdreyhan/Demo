import * as React from 'react';
import { connect } from 'react-redux';
import { ToolbarData, ToolbarStructure, accountDemoData } from './ViewAccountDetailsData.js';
import { findRelationShipType } from '../../../../../../Common/commonfunctions.js';
import WidgetComponent from '../../../../../../Common/WidgetComponent/WidgetComponent.js';

function ViewAccountDetails(props) {
  const [accountData, setAccountData] = React.useState([]);

  React.useEffect(() => {
    let accountDetails = [];
    const clientName = props?.accountInfo[0]?.clientName ?? '';
    const lobName = props?.accountInfo[0]?.lobName ?? '';
    const serviceDate = props?.accountInfo[0]?.serviceDate ?? '';
    const clientRootId = props?.accountInfo[0]?.clientRootId ?? '';
    const creditorName = props?.accountInfo[0]?.creditorName ?? '';
    const itemizationDate = props?.accountInfo[0]?.itemizationDate ?? '';
    const relationshipType = findRelationShipType(
      props.relationshipTypesData,
      props?.accountInfo[0]?.relationshipTypeId
    );
    accountDetails.push({
      ...props.accountInfo[0],
      clientName: clientName,
      creditorName: creditorName,
      lineOfBusiness: lobName,
      serviceDate: serviceDate,
      clientRootId: clientRootId,
      itemizationDate: itemizationDate,
      relationshipType,
      accountStatus: true
    });
    setAccountData(accountDetails);
  }, [props.accountInfo]);

  return (
    <WidgetComponent
      toolbarStructure={ToolbarStructure}
      toolbarData={ToolbarData}
      stateData={accountData}
      columnData={accountDemoData}
    />
  );
}

function mapStateToProps(state) {
  return {
    consumerAssocAccounts: state.ConsumerDetailsReducer.consumerAssocAccounts,
    relationshipTypesData: state.ConsumerDetailsReducer.relationshipTypesData
  };
}

export default connect(mapStateToProps)(ViewAccountDetails);
