export const TableHeaders = [
    {
      label: "QUEUE NAME",
      accessor: "name",
      operation: [],
      style: { align: "left", width: "203px"},
    },
    {
      label: "STATUS",
      accessor: "isActive",
      operation: ["convertBooleanToActiveInActiveWithIcon"],
      style: { align: "left", width: "108px"}, 
    },
    {
      label: "AVAILABLE ACCOUNT HOLDERS",
      accessor: "unworkedAccountHolders",
      operation: [],
      style: { align: "left",width: "242px"},
    },
    {
      label: "WORKED ACCOUNT HOLDERS",
      accessor: "workedAccountHolders",
      operation: [],
      style: { align: "left" },
    },
  ];

  