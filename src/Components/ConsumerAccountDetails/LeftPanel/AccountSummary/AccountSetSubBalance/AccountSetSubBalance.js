import * as React from 'react';
import PopUp from '../../../../Common/AEComponents/DialogBox/PopUp';
import {
  TableHeaders,
  dialogDataHeader,
  dialogDataFooter,
  dialogStructureHeader,
  dialogStructureFooter
} from './AccountSetSubBalanceData';
import { connect } from 'react-redux';
import { DynamicTable } from '@oasis/react-core';
import {formatCurrencyAllowZero} from '../../../../Common/commonfunctions.js'



const setPopupTitle = (props, dialogDataHeader) => {
  if (props.accountSubBalanceTitle) {
    let title = 'Account Holder Set SubBalance';
    if (props.accountSubBalanceTitle == 'Account Set Balance') {
      title = 'Account Holder Set SubBalance';
    } else if (props.accountSubBalanceTitle == 'Account Balance') {
      title = 'Account Balance SubBalance';
    } else if (props.accountSubBalanceTitle == 'Placement Amount') {
      title = 'Placement Amount SubBalance';
    }
    dialogDataHeader.forEach((header) => {
      if (header.accessor == 'title') {
        header.label = title;
        return header;
      }
    });
  }
};

function AccountSetSubBalance(props) {
  const [accountSubBalance, setAccountSubBalance] = React.useState([]);
  const [tableHeaders, setTableHeaders] = React.useState([]);

  const paddingStyles = {
    paddingLeft: '0px',
    paddingRight: '0px'
  };

  const setBalanceAmount =(final,headerTemp,tableHeaders,balance,type)=>{
    let balanceCheckerPlacement = '';
    if (props.initialBalance) {
      final.accountBalance = formatCurrencyAllowZero(props.accountBalance?.initialBalance);
      final[type.code] = formatCurrencyAllowZero(balance.initialBalance);
      balanceCheckerPlacement = balance.initialBalance;
    } 
    // Remaining Balance is for Account & 
    else {
      final.accountBalance = formatCurrencyAllowZero(props.accountBalance?.remainingBalance);
      final[type.code] = formatCurrencyAllowZero(balance.remainingBalance);
      // If remainingBalance 0 then also push the header in Account sub balance
      tableHeaders.push(headerTemp)
    }
    // If initialBalance <> 0 then only push the header in Payment sub balance
    if (balanceCheckerPlacement) {
      tableHeaders.push(headerTemp);
    }
  }

  React.useEffect(() => {
    let final = {};
    const tableHeaders = [...TableHeaders];
    if (props.accountBalance) {
      props.accountBalance.chargeItems.forEach((balance) => {
        final.accountNumber = props.accountNumber;
        props.subbalanceType.forEach((type) => {
          if (balance.code == type.code) {
            let headerTemp = {};
            headerTemp.title = type.code.toUpperCase();
            headerTemp.property = type.code.toUpperCase();
            headerTemp.operation = ['formatCurrencyAllowZero'];
            headerTemp.style = { align: 'right' };
            headerTemp.tableHeader = { showTooltip: true, valueInTooltip: type.description }
            setBalanceAmount(final,headerTemp,tableHeaders,balance,type);
          }
        });
      });
      const arr = [];
      arr.push(final);
      setTableHeaders(tableHeaders);
      setAccountSubBalance(arr);
    }
  }, [props.accountBalance]);

  //Call Set popup title dynamically
  setPopupTitle(props, dialogDataHeader);

  return (
    <>
      <PopUp
        popupWidth="md"
        showDialog={props.showDialog}
        handleDialog={props.handleDialog}
        dialogDataHeader={dialogDataHeader}
        dialogStructureHeader={dialogStructureHeader}
        dialogDataFooter={dialogDataFooter}
        dialogStructureFooter={dialogStructureFooter}
        formName="AccountSetSubBalance"
        style={paddingStyles}>
        <DynamicTable
          headers={tableHeaders}
          rows={accountSubBalance}
          showActions={false}
          showPaging={false}
          showFilter={false}
        />
      </PopUp>
    </>
  );
}

function mapStateToProps(state) {
  return {
    accountBalance: state.ConsumerDetailsReducer.accountBalance,
    subbalanceType: state.ConsumerDetailsReducer.subbalanceType,
    consumerAssocAccounts: state.ConsumerDetailsReducer.consumerAssocAccounts,
    currentAccountNumber: state.ConsumerDetailsReducer.currentAccountNumber
  };
}

export default connect(mapStateToProps)(AccountSetSubBalance);
