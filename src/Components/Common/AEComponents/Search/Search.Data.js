export const SearchMethodData = [

{
    id: 1,
    type: "select",
    accessor: "type",
    // label: "Phone Number Type",
    size: "small",
    xs: 5.5,
    // placeholder: "Select Search Method",
    name: "type",
    options: {
      optionsData: [
        {
            label: "Account Number",
            accessor: "AN",
            value: "AN",
            placeHolder: "Search Account Number",
            operation:["Number"],
          },
        {
          label: "Name",
          accessor: "NAME",
          value: "NAME",
          placeHolder: "Search Name",
          operation:["Name"]
        },
        {
          label: "City and Street",
          accessor: "CS",
          value: "CS",
          placeHolder: "Search City or street",
        },
        {
          label: "Phone Number",
          accessor: "PN",
          value: "PN",
          operation:["Phone"],
          placeHolder: "Search Phone Number",
          mask: "_",
          format: "(###) ###-####"
        },
        {
          label: "Postal Code",
            accessor: "PC",
            value: "PC",
            operation:["zipCodeFormat"],
            placeHolder: "Search Postal Code",
          },
        {
            label: "SSN",
            accessor: "SSN",
            value: "SSN",
            operation:["ssn"],
            placeHolder: "Search SSN by Last 4 Digits",
          },
         
      ],
    },
    // required: true,
  },];


