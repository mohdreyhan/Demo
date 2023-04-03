import CloseIcon from '../../../../../../../../Icons/Close.svg';
import { FolderOpenIcon } from '@oasis/react-core';
import { ColorPallete } from '../../../../../../../theme/ColorPallete';

export const dialogDataHeader = [
  {
    label: (
      <FolderOpenIcon
        style={{
          fontSize: '21px',
          marginRight: '7%',
          color: ColorPallete.Button.Secondary
        }}
      />
    ),
    accessor: 'icon',
    operation: []
  },
  {
    label: 'Single Payment',
    accessor: 'title',
    operation: []
  },
  {
    label: <img src={CloseIcon} />,
    accessor: 'CloseIcon',
    operation: ['click']
  }
];

export const dialogDataFooter = [
  {
    label: 'close',
    accessor: 'cancelButton',
    operation: ['click'],
    type: 'button',
    variant: 'outlined',
    size: 'small'
  }
];

export const dialogStructureHeader = [
  {
    id: 1,
    size: 0.3,
    component: 'label',
    accessor: 'icon',
    styles: {
      display: 'flex'
    }
  },
  {
    id: 2,
    size: 11,
    component: 'label',
    accessor: 'title',
    styles: {
      paddingLeft: '5px'
    }
  },
  {
    id: 31,
    size: 0.5,
    component: 'label',
    accessor: 'CloseIcon',
    styles: {
      cursor: 'pointer',
      paddingLeft: '40px'
    }
  }
];

export const dialogStructureFooter = [
  {
    id: 1,
    component: 'label',
    accessor: 'cancelButton',
    type: 'button'
  }
];

export const PaymentListStracture = [
  {
    label: 'Payment Date',
    accessor: 'postedDate',
    // operation: ["convertTimeStampToDate"],
    size: 6
  },
  {
    label: 'Effective Date',
    accessor: 'effectiveDate',
    // operation: ["convertTimeStampToDate"],
    size: 6
  },
  {
    label: 'Account Payment Amount',
    accessor: 'paymentAmount',
    size: 6
  },
  {
    label: 'Total Payment Amount',
    accessor: 'paymentAmount',
    size: 6
  },
  {
    label: 'Method',
    accessor: 'paymentType',
    size: 12
  },
  {
    label: 'Payer Name',
    accessor: 'payerName',
    size: 6
  },
  {
    label: 'Billing Address',
    accessor: 'billingAddress',
    size: 6
  },
  {
    label: 'Directed',
    accessor: 'directedIndicator',
    // operation: ["convertBooleanYesNo"],
    size: 12
  }
];

export const PaymentDataList = [
  {
    postedDate: '2022/11/22',
    effectiveDate: '2022/11/22',
    paymentAmount: '15',
    paymentType: 'ACH',
    directedIndicator: 'NO'
  }
];

export const TableHeadersPayment = [
  {
    label: 'ACCOUNT',
    accessor: 'accountId',
    style: { align: 'left' }
  },
  {
    label: 'CLIENT',
    accessor: 'client',
    style: { align: 'left' }
  },
  {
    label: 'PAYMENT AMOUNT',
    accessor: 'paymentAmount',
    style: { align: 'right', body: { width: 'auto' } }
  },
  {
    label: 'DUE TO CLIENT',
    accessor: 'dueToClient',
    style: { align: 'center' }
  },
  {
    label: 'TRUST ACCOUNT',
    accessor: 'trustAccount',
    style: { align: 'left' }
  }
];

export const PaymentListDemo = [
  {
    accountId: '1001',
    client: 'Client name',
    paymentAmount: '15'
  },
  {
    accountId: '23456',
    client: 'Client name',
    paymentAmount: '200'
  },
  {
    accountId: '34567',
    client: 'Client name',
    paymentAmount: '200'
  }
];

export const SubBalance = [
  {
    label: 'Subbalance Type',
    accessor: 'subBalanceCode',
    changedAccessor: 'subBalanceCodeDescription',
    style: { align: 'left', backgroundColor: 'white', cursor: 'pointer' }
  },
  {
    label: 'Amount',
    accessor: 'paymentAmount',
    style: { align: 'right', backgroundColor: 'white', body: { width: 'auto' } }
  }
];
