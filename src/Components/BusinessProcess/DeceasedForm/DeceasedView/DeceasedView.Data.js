
export const ConsumerDeceasedData = [
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
    label: "File Date",
    accessor: "fileDate",
    operation: ["convertTimetoUTC"]
  },
  {
    label: "Case Number",
    accessor: "caseNumber"
  },
  {
    label: "Verified Date",
    accessor: "verifiedDate",
    operation: ["convertTimetoUTC"]
  }];

export const CourtData = [
  {
    label: "Name",
    accessor: "name"
  },
  {
    label: "District",
    accessor: "district"
  },
  {
    label: "Division",
    accessor: "division"
  },
  {
    label: "Address",
    accessor: "address",
    style: {
      marginRight: '16px'
    }
  },
  {
    label: "County",
    accessor: "county"
  },
  {
    label: "Phone/Ext",
    accessor: "phone"
  },
  {
    label: "Website",
    accessor: "website"
  },
];
  export const ExecutorData =[
  {
    label: "Name",
    accessor: "name"
  },
  
  {
    label: "Address",
    accessor: "address"
  },
  {
    label: "Phone/Ext",
    accessor: "phoneNumber",
    operation: ["formatPhoneNumber"]
  },
];