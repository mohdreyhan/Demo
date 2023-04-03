export const viewDisputeData = [
    {
      id: 1,
      label: 'Dispute',
      accessor: 'isDisputed',
      operation: ["convertBooleanYesNo"],
    },
    {
      id: 2,
      label: 'Reason for Dispute',
       accessor: 'reasonId'
    },
    {
      id: 3,
      label: 'Dispute Date',
      accessor: 'date',
      operation: ["convertTimetoUTC"],
    },
  ];
  