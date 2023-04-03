import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon
} from "@oasis/react-core";
import React, { useState } from "react";
import useStyles from "../../Styles/WorkflowStyle";

const HistoricalTable = (props) => {
  const classes = useStyles();
  const { headData, rows, childHistoryData } = props;

  const Row = (rowProps) => {
    const { row } = rowProps;
    const [open, setOpen] = useState(false);
    const [childDisplay, setChildDisplay] = useState("none");
    const childHistoryDataStyle = () => {
      setOpen(!open);
      setChildDisplay(childDisplay === "none" ? "visible" : "none");
    };
    return (
      <>
        <TableRow sx={{ cursor: "pointer" }} onClick={childHistoryDataStyle}>
          <TableCell component="th" scope="row" colSpan={7}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            {row.text}
          </TableCell>
        </TableRow>
        {rowProps?.childHistoryData.map((data) => (
          <TableRow
            key={data.code}
            sx={{
              display: childDisplay,
            }}
          >
            <TableCell align="right">{data?.code}</TableCell>
            <TableCell>{data?.status}</TableCell>
            <TableCell>{data?.sdate}</TableCell>
            <TableCell>{data?.fdate}</TableCell>
            <TableCell>{data?.cdate}</TableCell>
            <TableCell>{data?.by}</TableCell>
            <TableCell>{data?.cby}</TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <div>
      <TableContainer sx={{ maxHeight: "50vh" }}>
        <Table stickyHeader>
          <TableHead
            className={classes.customTblHeader}
            sx={{ "& th": { cursor: "pointer" }, width: "100%" }}
          >
            <TableRow>
              {headData.map((head) => (
                <TableCell
                  key={head.Header}
                  sx={{
                    "&.MuiTableCell-root": { paddingLeft: 0, paddingRight: 0 },
                  }}
                >
                  {head.Header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <Row key={row.id} row={row} childHistoryData={childHistoryData} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoricalTable;
