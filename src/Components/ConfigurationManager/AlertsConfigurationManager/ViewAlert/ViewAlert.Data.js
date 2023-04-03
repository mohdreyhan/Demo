export const TableHeaders = [
  {
    label: "STATUS",
    accessor: "active",
    operation: ["convertBooleanToActiveInActiveWithIcon"],
    style: { align: "left" },  
    width:"200px !important",
  },
    {
      label: "ALERT DESCRIPTION",
      accessor: "description",
      operation: [""],
      style: {
        align: "left",
        body: {
          width: "600px",
        },
      },
    },
    
  ];
  

 export const inputData = {
    alerts: [
      {
        active: true,
        alertDescription: "Alert Anirban",
      },
      {
        active: false,
        alertDescription: "Bankrupt",
      },
      {
        active: false,
        alertDescription: "Call Customer",
      },
      {
        active: true,
        alertDescription: "DO Not Call",
      },
      {
        active: true,
        alertDescription: "Matt work",
      },
    ],
  };
