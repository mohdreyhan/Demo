export const TableHeaders = [
  {
    title: 'EMPLOYER NAME',
    property: 'companyName',
    operation: []
    // style: { align: "left" },
  },
  {
    title: 'TYPE',
    property: 'employmentTypeId',
    operation: []
    // style: { align: "left" },
  },
  {
    title: 'ADDRESS',
    property: 'address',
    operation: [],
    style: { width: 145, cursor: "pointer" },
    pattern: '^.{0,1000}',
    tableBody: {
      showTooltip: true
    }
  },
  {
    title: 'START DATE',
    property: 'startDate',
    operation: ['convertTimestamptoUSA']
    // style: { align: "right" },
  },
  {
    title: 'EMPLOYER PHONE 1',
    property: 'phoneNumberOne',
    operation: ['formatPhoneNumber']
    // style: { align: "right" },
  },
  {
    title: 'EMPLOYER PHONE 2',
    property: 'phoneNumberTwo',
    operation: ['formatPhoneNumber']
    // style: { align: "right" },
  },
  {
    title: 'EMPLOYER CONTACT',
    property: 'employerContact',
    operation: []
    // style: { align: "left" },
  },
  {
    title: 'VERIFIED',
    property: 'verified',
    operation: ["convertBooleanYesNo"],
    // style: { align: "left" },
  }
];
