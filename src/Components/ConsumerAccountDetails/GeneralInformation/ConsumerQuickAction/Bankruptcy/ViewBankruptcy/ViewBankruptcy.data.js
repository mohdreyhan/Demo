export const bankruptcyInfo = [
  {
    label: "Bankrupt",
    accessor: "isBankrupt",
    operation: ["convertBooleanYesNo"]
  },
  {
    label: "Bankruptcy Type",
    accessor: "bankruptcyTypeId",
  },
  {
    label: "",
    accessor: "",
  },
  {
    label: "File Date",
    accessor: "fileDate",
    operation: ["convertTimetoUTC"],
  },
  {
    label: "Case Number",
    accessor: "caseNumber",
  },
  {
    label: "Verification Date",
    accessor: "verificationDate",
    operation: ["convertTimetoUTC"],
  },
]
export const courtInfo = [
  {
    label: "Name",
    accessor: "name"
  },
  {
    label: "District",
    accessor: "district",
  },
  {
    label: "Division",
    accessor: "division",
  },
  {
    label: "Address",
    accessor: "address",
  },
  {
    label: "County",
    accessor: "county",
  },
  {
    label: "Phone/Ext",
    accessor: "phones",
  },
  {
    label: "Website",
    accessor: "website"
  }
]
export const trusteeInfo = [
  {
    label: "Trustee Name",
    accessor: "name"
  },
  {
    label: "Address",
    accessor: "address"
  },
  {
    label: "Phone/Ext",
    accessor: "phones",
  }
]