export const TableHeaders = [
  {
    title: "TYPE",
    property: "emailType",
    operation: ["formatEmailType"],
  },
  {
    title: "EMAIL ADDRESS",
    property: "emailAddress",
    operation: ["formatPhoneNumberType"],
  },
  {
    title: "EMAIL CONSENT        ",
    property: "emailConsent",
  },
  {
    title: "E-SIGN CONSENT    ",
    property: "esignConsent",
  },
  {
    title: "SOURCE",
    property: "emailConsentSource",
    operation: ["convertPhoneStatus"],
  },
  {
    title: "STATUS",
    property: "active",
  },
  {
    title: "PRIMARY",
    property: "isDefault",
    defaultSorting: true,
    defaultSortingOrder: "desc",
  },
];
