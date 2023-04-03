import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Popover,
  Typography,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon
} from "@oasis/react-core";
import useStyles from "./DataTable.style";
import { useState } from "react";
import Actions from "../../../Images/Actions.png";
import Crud from "../../../Images/3Dots.png";

const DynamicTable = (props) => {
  const classes = useStyles();
  const { headdata, rows } = props;
  const [order, setOrder] = useState("");
  const [orderBy, setOrderby] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const handleSortingRequest = (cellId) => {
    const isAsc = (orderBy === cellId) & (order === "asc");
    setOrder(isAsc ? "desc" : "asc");
    setOrderby(cellId);
  };
  function stablesort(records, comparator) {
    const stablizedThis = records.map((el, index) => [el, index]);
    stablizedThis.sort((a, b) => {
      const neworder = comparator(a[0], b[0]);
      if (neworder !== 0) return neworder;
      return a[1] - b[1];
    });

    return stablizedThis.map((el) => el[0]);
  }
  function getComparator(sortOrder, sortOrderBy) {
    return sortOrder === "desc"
      ? (a, b) => descendingComparator(a, b, sortOrderBy)
      : (a, b) => -descendingComparator(a, b, sortOrderBy);
  }
  function descendingComparator(a, b, compOrder) {
    if (b[compOrder] < a[compOrder]) {
      return -1;
    }
    if (b[compOrder] > a[compOrder]) {
      return 1;
    }
    return 0;
  }
  const recordaAfterPagingandSorting = () => {
    return stablesort(rows, getComparator(order, orderBy));
  };

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPopoverId(event.currentTarget.id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopoverId(null);
  };

  const toggleAction = (row, action) => {
    props.actionClickType(action, row);
    setAnchorEl(null);
    setOpenPopoverId(null);
  };
  const Icon = (newprops) => {
    const { orderColumn } = newprops;
    const active = orderColumn === orderBy;
    return (
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "Center",
          alignItems: "Center",
          marginLeft: "5px",
        }}
      >
        <KeyboardArrowUpIcon
          sx={{ fontSize: "18px", marginBottom: "-8px" }}
          color={
            order === "desc" || order === ""
              ? "disabled"
              : active
          }
        />
        <KeyboardArrowDownIcon
          sx={{ fontSize: "18px", marginBottom: "-8px" }}
          color={
            order === "asc" || order === ""
              ? "disabled"
              : active
          }
        />
      </span>
    );
  };

  return (
    <TableContainer className={classes.tableContainer}>
      <Table stickyHeader>
        <TableHead className={classes.tableHeadStyle}>
          <TableRow>
            {headdata.map((column) => (
              <TableCell
                key={column.Header}
                sortDirection={orderBy === column.accessor ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column.accessor}
                  direction={orderBy === column.accessor ? order : "asc"}
                  onClick={() => {
                    handleSortingRequest(column.accessor);
                  }}
                  IconComponent={() => <Icon orderColumn={column.accessor} />}
                >
                  <div style={{ marginBottom: "-7px" }}>{column.Header}</div>
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell className={classes.boxShadowCell}>
              <img className={classes.imageIcon} src={Actions} alt="" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBodyStyle}>
          {rows.length > 0 &&
            recordaAfterPagingandSorting().map((row) => (
              <TableRow key={row}>
                {headdata.map((header) =>
                  row.hasOwnProperty(header.accessor) ? (
                    <TableCell key={header.accessor}>
                      {row[header.accessor]}
                    </TableCell>
                  ) : (
                    ""
                  )
                )}
                <TableCell className={classes.boxShadowCell}>
                  <img
                    className={classes.imageIcon}
                    src={Crud}
                    aria-describedby={row.id}
                    id={row.id}
                    onClick={handlePopoverClick}
                  />
                  <Popover
                    id={row.id}
                    open={openPopoverId == row.id}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "left",
                    }}
                  >
                    <Typography>
                      <div
                        className={classes.tableActionButtons}
                        onClick={() => toggleAction(row, "Update")}
                      >
                        Update
                      </div>
                      <div
                        className={classes.tableActionButtons}
                        onClick={() => toggleAction(row, "delete")}
                      >
                        Delete
                      </div>
                    </Typography>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell sx={{ textAlign: "center" }} colSpan={100}>
                No Records Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/*  <TableFooter>
            <TableRow>
                  <TablePagination page={page} rowsPerPageOptions={pages}
                  rowsPerPage={rowsPerPage}
                  count = {rows.length}
                  showFirstButton
                  showLastButton
                  onPageChange = {handleChangePage}
                  onRowsPerPageChange = {handleRowsPerPage}
                  />
  
              </TableRow>    
            </TableFooter> */}
      </Table>
    </TableContainer>
  );
};
export default DynamicTable;
