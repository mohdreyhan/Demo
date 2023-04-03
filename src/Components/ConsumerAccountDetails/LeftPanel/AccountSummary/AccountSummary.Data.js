export const AccountSummaryInformation = [
  {
    label: "Total Accounts",
    accessor: "totalRecords",
    operation: [],
  },
  {
    label: "Account Holder Set Balance",
    accessor: "currentAccountBalance",
    clickable: true,
    operation: ["formatCurrencyAllowZero"],
    balance: "remainingBalance",
  },
  {
    label: "Agency Balance",
    accessor: "setBalance",
    operation: ["formatCurrencyAllowZero"],
  },
  // {
  //     label: "Next Payment Amount",
  //     accessor: "nextPaymentDueAmount",
  //     operation: ["formatCurrencyAllowZero"],
  // },
  // {
  //     label: "Next Payment Date",
  //     accessor: "nextPaymentDueDate",
  //     operation: ["convertTimestamptoUSA"],
  // },
  {
    label: "Account Status",
    accessor: "accountSetStatus",
    operation: ["convertAllFalseToActive"],
  },
  {
    label: "Account Holder Status",
    accessor: "active",
    operation: ["convertAllFalseToActive"],
  },
];
