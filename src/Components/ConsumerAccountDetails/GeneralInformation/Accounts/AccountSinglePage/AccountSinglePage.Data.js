import { ChevronLeftIcon } from '@oasis/react-core';
import GeneralInformation from '../../../../../../Icons/GeneralInformation.svg';
import History from '../../../../../../Icons/History.svg';
import GeneralInformationOnSelectIcon from '../../../../../../Icons/IconsOnSelect/GeneralInformationOnSelect.svg';
import HistoryOnSelectIcon from '../../../../../../Icons/IconsOnSelect/HistoryOnSelect.svg';

export const AccountBasicInfo = (accountInfo) => {
  return {
    id: accountInfo?.accountUuid,
    image: <ChevronLeftIcon />,
    backUrl: '/consumer',
    accountNumber: accountInfo?.accountNumber ?? 'N/A',
    clientName: accountInfo?.clientName ?? 'N/A'
  };
};

export const setAccountSummary = (accountDetails) => {
  return [
    {
      label: 'Account Balance',
      value: `$${accountDetails?.currentAccountBalance ?? ''}`,
      clickable: true,
      balance: 'remainingBalance',
      accountUuid: accountDetails?.accountUuid,
      accountNumber: accountDetails?.accountNumber,
      operation: 'formatCurrencyAllowZero'
    },
    {
      label: 'Placement Amount',
      value: `$${accountDetails?.placementAmount ?? ''}`,
      clickable: true,
      balance: 'initialBalance',
      accountUuid: accountDetails?.accountUuid,
      accountNumber: accountDetails?.accountNumber,
      operation: 'formatCurrencyAllowZero'
    },
    // {
    //     label: "Next Payment Amount",
    //     value: accountDetails?.lastPaymentAmount ?? ""
    // },
    // {
    //     label: "Next Payment Date",
    //     value: accountDetails?.lastPaymentDate ?? ""
    // },
    {
      label: 'Account Status',
      value: 'Active'
    }
  ];
};

export const ListData = [
  {
    id: 1,
    name: 'General Information',
    icon: <img height="20" src={GeneralInformation} />,
    iconOnSelect: <img height="20" src={GeneralInformationOnSelectIcon} />,
    routePath: '/consumer/accountpage/general'
  },
  {
    id: 2,
    name: 'History',
    icon: <img height="20" src={History} />,
    iconOnSelect: <img height="20" src={HistoryOnSelectIcon} />,
    routePath: '/consumer/accountpage/history'
  }
];

export const singleAccountHistoryMockData = [
  {
    createdBy: '00u5gvrnsxFAFAxlb5d7',
    createdOn: '2022-11-18T14:16:45Z',
    modifiedBy: '00u5gvrnsxFAFAxlb5d7',
    modifiedOn: '2022-11-18T14:16:45Z',
    paymentId: 'PR12',
    paymentAmount: 50.0,
    referenceId: 'REF121',
    effectiveDate: '2022-11-16T10:35:34.000+00:00',
    postedDate: '2022-11-16T10:35:34.000+00:00',
    accountId: '1001',
    paymentMethod: 'DP',
    directedIndicator: false,
    paymentType: 'DP',
    trustAccount: '6754',
    consumerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  },
  {
    createdBy: '00u5gvrnsxFAFAxlb5d7',
    createdOn: '2022-11-18T14:16:45Z',
    modifiedBy: '00u5gvrnsxFAFAxlb5d7',
    modifiedOn: '2022-11-18T14:16:45Z',
    paymentId: 'PR13',
    paymentAmount: 15.0,
    referenceId: 'REF123',
    effectiveDate: '2022-11-16T10:35:34.000+00:00',
    postedDate: '2022-11-16T10:35:34.000+00:00',
    accountId: '1001',
    paymentMethod: 'ACH',
    directedIndicator: false,
    paymentType: 'ACH',
    trustAccount: '6754',
    consumerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    uuid: '826d3858-e661-4449-8fe5-59a53262084a'
  }
];

export const singlePaymentStatus = {
  COMPLETED: { status: 'Paid', statusCode: 'active' }
};
