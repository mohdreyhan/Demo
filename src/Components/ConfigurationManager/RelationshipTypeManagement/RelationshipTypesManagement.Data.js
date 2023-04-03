export const TableHeaders = [
  {
    label: "RESPONSIBLE",
    accessor: "responsible",
    operation: ["displayCheckBox"],
    style: { align: "left", width: "123px", height: "38px" },
  },
  {
    label: "TYPE",
    accessor: "name",
    operation: [""],
    style: { align: "left", width: "210px", height: "38px" },
  },
  {
    label: "DESCRIPTION",
    accessor: "description",
    operation: [""],
    style: {
      align: "left",
      width: "719px",
      height: "38px",
      body: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: "719px",
      },
    },
  },
];
