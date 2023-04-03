export const TableHeaders = [
    {
      id: 1,
      label: 'REASON  FOR COMPLAINT',
      accessor: 'reasonId',      
      operation: [],
    },
    {
      id: 2,
      label: 'DATE OF COMPLAINT',
      accessor: 'complaintDate',
      defaultSorting: true,
      defaultSortingOrder: "desc",
      style: {
        align: "left"
      },
      operation: ["convertTimetoUTC"]
    },
    {
      id: 3,
      label: 'VALID',
      accessor: 'isValid',
      style: { align: "left",width:'100%'  },
      operation: ["convertBooleanYesNo"]
    },
  ];
  