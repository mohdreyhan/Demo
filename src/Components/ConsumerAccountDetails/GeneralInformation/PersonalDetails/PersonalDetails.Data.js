import EditInMenuIcon from "../../../../../Icons/IconsInMenu/EditInMenu.svg";

export const consumerDemoData = [
  {
    label: "Name",
    accessor: "fullName"
  },
  {
    label: "SSN",
    accessor: "ssn",
    operation: ["getssn"],
  },
  {
    label: "DOB",
    accessor: "dateOfBirth",
    operation: ["convertTimestamptoUSA"],
  },
  {
    label: "Preferred Language",
    accessor: "languageReferenceId",
  },
];

export const consumerDeceasedData = [
  {
    label: "Deceased",
    accessor: "deceased",
  },
  {
    label: "Deceased Date",
    accessor: "date",
    operation: ["convertTimetoUTC"],
  },
  {
    label: "Address",
    accessor: "address",
    operation: [],
  },
  {
    label: "Deceased Verified Date",
    accessor: "verifiedDate",
    operation: ["convertTimetoUTC"],
  },
  {
    label: "Case Number",
    accessor: "caseNumber"
  },
  {
    label: "File Date",
    accessor: "fileDate",
    operation: ["convertTimetoUTC"]
  },


];

export const consumerAliasData = [
  {
    label: "Name",
    accessor: "name",
  },
  {
    label: "Type",
    accessor: "typeId",
  },
]


export const MenuItems = [
  {
    label: <img src={EditInMenuIcon} />,
    accessor: "Update Consumer Details",
    styles: {
      icon: {
        display: "flex",
      },
      text: {
        paddingLeft: "5px",
        fontWeight: 400,
      },
    },
  },
];


