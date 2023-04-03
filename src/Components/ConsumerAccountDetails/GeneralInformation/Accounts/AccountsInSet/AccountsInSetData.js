export const TableHeaders = [
  {
    title: "ACCOUNT NO",
    property: "accountNumber",
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
    title: "CLIENT REFERENCE #",
    property: "originalAccountNumber",
    // style: { align: "left" },
  },
  {
    title: "STATUS",
    property: "accountStatus",
    hideIndicator: true
    // operation: ["convertBooleanToActiveInActiveWithIcon"],
    // style: { align: "left" },
  },
  {
    title: "RELATIONSHIP",
    property: "relationshipType",
    operation: [],
    // style: { align: "left" },
  },
  {
    title: "BALANCE",
    property: "currentAccountBalance",
    operation: ["formatCurrencyAllowZero"],
    // style: { align: "right" },
  },
  {
    title: "CLIENT NAME",
    property: "clientname",
    operation: [],
    // style: { align: "right" },
  },
  {
    title: "CREDITOR NAME",
    property: "creditorName",
    operation: [],
    // style: { align: "right" },
  },
];
