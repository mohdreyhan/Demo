export const TableHeaders = [
    {
      title: "STATUS",
      property: "active",
      operation: ["convertBooleanToActiveInActiveWithIcon"],
      style: { align: "left" },  
      width:"150px",
    },
      {
        title: "OUTCOME DESCRIPTION",
        property: "description",
        operation: [""],
        style: {
          align: "left",
          body: {
            width: "150px",
          },
        },
      },
      {
        title: "CALL METHOD",
        property: "callmethods",
        operation: [""],
        style: {
          align: "left",
          body: {
            width: "500px",
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
  