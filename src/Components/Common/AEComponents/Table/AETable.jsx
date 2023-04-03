import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  CircularProgress,
  Checkbox,
  KeyboardArrowUpIcon,
  KeyboardArrowDownIcon,
  Tooltip,
  styled,
  FiberManualRecordIcon,
  tooltipClasses,
  Paper,
  Stack
} from '@oasis/react-core';
import {
  formatCurrencyAllowZero,
  returnValueOrDefault,
  returnValueOrDefaultNested,
  defaultSorting,
  defaultSortingOrder
} from '../../commonfunctions';
import useStyles from './AETable.styles';
import MoreButton from '../More/MoreButton';
import FilterButton from '../Filter/FilterButton';
import { ColorPallete } from '../../../../theme/ColorPallete';
import WarningAmber from '../../../../../Icons/WarningAmberEllipse.svg';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom-start" followCursor />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: '10px',
    font: 'Poppins',
    fontWeight: '400px'
  }
}));

const getColor = (order, type, active) => {
  if (order === type || order === '') {
    return 'disabled';
  }
  if (active) {
    return '';
  }
  return 'disabled';
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
  return sortOrder === 'desc'
    ? (a, b) => descendingComparator(a, b, sortOrderBy)
    : (a, b) => -descendingComparator(a, b, sortOrderBy);
}

function descendingComparator(a, b, compOrder) {
  if (JSON.stringify(b[compOrder]) < JSON.stringify(a[compOrder])) {
    return -1;
  }
  if (JSON.stringify(b[compOrder]) > JSON.stringify(a[compOrder])) {
    return 1;
  }
  return 0;
}

const showEmptyTile = (type, methodname = '') => {
  return (
    <>
      <img height="90px" src={WarningAmber} width="90px" />
      <div style={{ paddingTop: '10px' }}>{`There are no ${methodname} ${type} found.`}</div>
    </>
  );
};

const recordaAfterPagingandSorting = (currentRecordss, tableHeaders, order, orderBy) => {
  currentRecordss.map((data) => {
    tableHeaders.map((header) => {
      if (
        data[header.accessor] !== 'N/A' &&
        header.operation?.includes('formatCurrencyAllowZero')
      ) {
        data[header.accessor] = formatCurrencyAllowZero(data[header.accessor]);
      }
      if (
        data[header.accessor] !== 'N/A' &&
        header.operation?.includes('convertBooleanToActiveInActiveWithIcon')
      ) {
        data[header.accessor] =
          data[header.accessor] === true ||
          data[header.accessor]?.props?.children?.includes('Active') ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FiberManualRecordIcon
                style={{
                  color: ColorPallete.Table.AcitveIcon,
                  marginLeft: '-5px',
                  width: '18px'
                }}
              />
              {'Active'}
            </div>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FiberManualRecordIcon
                style={{
                  color: ColorPallete.Table.InActiveIcon,
                  marginLeft: '-5px',
                  width: '18px'
                }}
              />
              {'Inactive'}
            </span>
          );
      }
    });
  });
  return stablesort(currentRecordss, getComparator(order, orderBy));
};

const Icon = (newprops) => {
  const { orderColumn, orderBy, order } = newprops;
  const active = orderColumn === orderBy;
  return (
    <span
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'Center',
        alignItems: 'Center',
        paddingBottom: '10px'
      }}>
      <KeyboardArrowUpIcon
        sx={{ fontSize: '18px', marginBottom: '-8px' }}
        color={getColor(order, 'desc', active)}
      />
      <KeyboardArrowDownIcon
        sx={{ fontSize: '18px', marginBottom: '-8px' }}
        color={getColor(order, 'asc', active)}
      />
    </span>
  );
};

const AETable = (props) => {
  const styles = useStyles();
  const [order, setOrder] = useState(defaultSortingOrder(props.tableHeaders));
  const [orderBy, setOrderby] = useState(returnValueOrDefault(defaultSorting(props.tableHeaders), props.tableHeaders[0]?.accessor)); const [currentRecords, setCurrentRecords] = useState([]);  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
   setLoader(true);
   if (props.currentRecords) {
    setCurrentRecords(props.currentRecords);
    if (props.isSortBy === 'none') {
      setOrderby(null);
    }
    setTimeout(() => setLoader(false), 1000);
  }
}, [props.currentRecords]);

  const handleSortingRequest = (cellId) => {
    const isAsc = (orderBy === cellId) & (order === 'asc');
    if (isAsc) {
      setOrder('desc');
    } else {
      setOrder('asc');
    }
    setOrderby(cellId);
  };

  if (currentRecords?.length > 0) {
    return (
      <TableContainer
        style={returnValueOrDefault(props.styles.TableContainer, {})}
        className={returnValueOrDefaultNested(
          [props.applyMakeStyles],
          [styles.tableContainer],
          ''
        )}>
        <Table stickyHeader>
          <TableHead
            className={returnValueOrDefaultNested(
              [props.applyMakeStyles],
              [styles.tableHeaderStyle],
              ''
            )}
            sx={props.customTblHeaderStyle}>
            <TableRow hover={props.hover} sx={props.hoverColor}>
              {props.tableHeaders.map((header, index) => (
                <TableCell
                  component="th"
                  align ={props.singlePaymentStyle && header?.style?.align}
                  id={index}
                  scope="row"
                  padding="normal"
                  key={header.accessor}
                  sortDirection={returnValueOrDefaultNested(
                    [orderBy === header.accessor],
                    [order],
                    false
                  )}
                  style={returnValueOrDefault(props.styles?.others?.tableHeaderTableCell, {})}
                  width={returnValueOrDefault(header?.style?.width, '')}
                  height={returnValueOrDefault(header?.style?.height, '')}
                  sx={returnValueOrDefaultNested(
                    [props.styles?.firstChild, props.styles?.lastChild],
                    [
                      {
                        '&:first-child': props.styles?.firstChild
                      },
                      {
                        '&:last-child': props.styles?.lastChild
                      }
                    ],
                    {}
                  )}>
                  <>
                    <Typography
                      noWrap
                      sx={returnValueOrDefault(
                        props.styles?.others?.tableHeaderTableCellTypography,
                        {
                          fontFamily: 'Poppins',
                          fontSize: '12px',
                          fontWeight: '700'
                        }
                      )}>
                      <>
                        {!props.noSortingIcon ? (
                          <TableSortLabel
                            active={returnValueOrDefaultNested(
                              [orderBy === header.accessor],
                              [true],
                              false
                            )}
                            direction={returnValueOrDefaultNested(
                              [orderBy === header.accessor],
                              [order],
                              'asc'
                            )}
                            onClick={() => {
                              handleSortingRequest(header.accessor);
                            }}
                            IconComponent={() => (
                              <Icon orderColumn={header.accessor} orderBy={orderBy} order={order} />
                            )}>
                            {header.showTooltip ? (
                              <BootstrapTooltip title={<div>{header.label}</div>}>
                                <div style={returnValueOrDefault(header.style, {})}>
                                  {header.accessor}
                                </div>
                              </BootstrapTooltip>
                            ) : (
                              header.label
                            )}
                          </TableSortLabel>
                        ) : header.showTooltip ? (
                          <BootstrapTooltip title={<div>{header.label}</div>}>
                            <div style={returnValueOrDefault(header.style, {})}>
                              {header.accessor}
                            </div>
                          </BootstrapTooltip>
                        ) : (
                          header.label
                        )}
                      </>
                    </Typography>
                  </>
                </TableCell>
              ))}
              <>
                {!props.showMoreButton && (
                  <TableCell
                    padding="none"
                    sx={returnValueOrDefaultNested(
                      [props.styles?.stlastChild],
                      [
                        {
                          '&:last-child': props.styles?.stlastChild
                        }
                      ],
                      {}
                    )}
                    style={{
                      backgroundColor: ColorPallete.Button.Tertiary,
                      textAlign: 'center',
                      width: '40px',
                      boxShadow: '-2px 0px 2px rgba(68, 68, 68, 0.4) !important'
                    }}>
                    <FilterButton contactInfo={returnValueOrDefault(props.contactInfo, false)} />
                  </TableCell>
                )}
              </>
            </TableRow>
          </TableHead>
          <TableBody
            className={returnValueOrDefaultNested(
              [props.applyMakeStyles],
              [styles.tableBodyStyle],
              ''
            )}>
            {recordaAfterPagingandSorting(currentRecords, props.tableHeaders, order, orderBy).map(
              (row, index) => {
                return (
                  <TableRow
                    key={`${row.id}_${index+1}`}
                    hover={props.hover}
                    sx={props.hoverColor}
                    onClick={returnValueOrDefaultNested(
                      [props.type == 'relationshipType'],
                      [() => props.handleDialog(!props.showDialog, row)],
                      null
                    )}>
                    {props.tableHeaders.map((header) => {
                      return (
                        row.hasOwnProperty(header.accessor) && (
                          <TableCell
                            className={returnValueOrDefaultNested(
                              [props.isheight],
                              [styles.disputeTableRow],
                              ''
                            )}
                            key={header.accessor}
                            align={header.style?.align}
                            style={returnValueOrDefault(
                              props.styles?.others?.tableBodyTableCell,
                              {}
                            )}
                            sx={returnValueOrDefaultNested(
                              [props.styles?.firstChild, props.styles?.lastChild],
                              [
                                {
                                  '&:first-child': props.styles?.firstChild
                                },
                                {
                                  '&:last-child': props.styles?.lastChild
                                }
                              ],
                              {}
                            )}>
                            <>
                              {header.operation?.includes('displayCheckBox') ? (
                                <Checkbox
                                  checked={row[header.accessor]}
                                  value={row[header.accessor]}
                                  style={{ paddingLeft: '7px' }}
                                />
                              ) : header.accessor == 'address' ||
                                header.accessor == 'subBalanceCode' ? (
                                <BootstrapTooltip
                                  title={
                                    <div
                                    // style={{
                                    //   display: 'flex',
                                    //   alignItems: 'center'
                                    // }}
                                    >
                                      {props.changeAccessor
                                        ? row[header.changedAccessor]
                                        : row[header.accessor]}
                                    </div>
                                  }>
                                  <div style={returnValueOrDefault(header.style, {})}>
                                    {row[header.accessor]}
                                  </div>
                                </BootstrapTooltip>
                              ) : header.accessor == 'city' ||
                                header.accessor == 'stateCode' ||
                                header.accessor == 'countryCode' ? (
                                <div style={returnValueOrDefault(header?.style, {})}>
                                  {row[header.accessor]}
                                </div>
                              ) : (
                                <div
                                  style={returnValueOrDefault(header.style?.body, {
                                    width: 'max-content'
                                  })}>
                                  {row[header.accessor]}
                                </div>
                              )}
                            </>
                          </TableCell>
                        )
                      );
                    })}
                    <>
                      {!props.showMoreButton && (
                        <TableCell
                          sx={returnValueOrDefaultNested(
                            [props.styles?.stlastChild],
                            [
                              {
                                '&:last-child': props.styles?.stlastChild
                              }
                            ],
                            {}
                          )}>
                          <MoreButton
                            moreButtonCustom={props.moreButtonCustom}
                            handleClick={props.handleClick}
                            data={props.data}
                            tableRowData={row}
                            contactInfo={returnValueOrDefault(props.contactInfo, false)}
                          />
                        </TableCell>
                      )}
                    </>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <Paper
        style={{
          padding: '30px',
          maxHeight: '200px',
          display: 'block',
          alignItems: 'center',
          fontFamily: 'poppins',
          fontSize: '20px',
          boxShadow: "none"
        }}>
        <Stack sx={{ alignItems: 'center' }}>
          {returnValueOrDefaultNested(
            [loader],
            [<CircularProgress key={0} />],
            showEmptyTile('records', props.methodname)
          )}
        </Stack>
      </Paper>
    );
  }
};

export default AETable;
