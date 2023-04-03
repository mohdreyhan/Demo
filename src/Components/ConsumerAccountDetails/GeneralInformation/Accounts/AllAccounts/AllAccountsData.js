export const TableHeaders = [
  {
    label: "ACCOUNT NO",
    accessor: "accountNumber",
    operation: [],
    style: {
      header : {
        position: 'sticky',
        left: 0,
        boxShadow: '2px 0px 3px rgb(68 68 68 / 48%)',
        paddingLeft: "24px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        zIndex: 3
        },
        position: 'sticky',
        left: 0,
        boxShadow: '2px 0px 3px rgb(68 68 68 / 48%)',
        backgroundColor: "white",
      },
  },
  {
    label: "CLIENT REFERENCE #",
    accessor: "originalAccountNumber",
    style: { align: "left" },
  },
  {
    label: "RELATIONSHIP",
    accessor: "relationshipType",
    operation: [],
    style: { align: "left" },
  },
  {
    label: "BALANCE",
    accessor: "currentAccountBalance",
    operation: ["formatCurrencyAllowZero"],
    style: { align: "right" },
  },
  {
    label: "CLIENT NAME",
    accessor: "clientname",
    operation: [],
    style: { align: "right" },
  },
  {
    label: "CREDITOR NAME",
    accessor: "creditorName",
    operation: [],
    style: { align: "right" },
  },
  {
    label: "ACC STATUS",
    accessor: "accountStatus",
    operation: [],
    style: { align: "left" },
  },
  {
    label: "ACC HOLDER STATUS",
    accessor: "accountStatus",
    operation: ["convertBooleanToActiveInActiveWithIcon"],
    style: { align: "left" },
  },
];
