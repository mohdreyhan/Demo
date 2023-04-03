import { Chip, Grid, CircularProgress, MuiButton } from '@oasis/react-core';
import { HistoryStatus, HistoryStatusClass, nestedIfCaseHandle } from '../Business.Data';
import useStyles from '../../../Styles/BusinessProcessStyle';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import {
  convertTimestamptoUSA,
  extractImagePath,
  returnValueOrDefault
} from '../../Common/commonfunctions';
import { connect } from 'react-redux';
import { SETHISTORYBPDATA, SETCANCELBPDATA } from '../../../Actions/BusinessProcess/ActionCreators';
import { getHistoryDetails } from '../ApiAction';

const getMinimumWidth = (record) => {
  return nestedIfCaseHandle(record?.status == 'IN_PROCESS', '230px', '290px');
};

const getCreatedDate = (record) => {
  if (record) {
    return record?.createdDate ? convertTimestamptoUSA(record?.createdDate) : '-';
  }
};

const getCancelled = (record) => {
  if (record?.status == 'CANCELLED') {
    return `• Cancelled ${
      record?.lastUpdatedDate && convertTimestamptoUSA(record?.lastUpdatedDate)
    }`;
  }
};

const History = (props) => {
  const { updatePopupProps } = props;
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const limit = 15;
  const [offset, setOffset] = useState(0);
  const [historyData, setHistoryData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    initialLoadRecord();
    const scrollTag = document.querySelector('#historyMain');
    scrollTag.addEventListener('scroll', () => handleScroll());
    props.SETCANCELBPDATA(false);
  }, []);

  useEffect(() => {
    if (isFetching) {
      updateNewRecords();
    }
  }, [isFetching]);

  const handleScroll = () => {
    const scrollTag = document.querySelector('#historyMain');
    let scrollTagVal = Math.round(scrollTag.scrollHeight - scrollTag.scrollTop);
    if (scrollTagVal == scrollTag.clientHeight + 1) {
      scrollTagVal--;
    }
    if (scrollTagVal + 1 == scrollTag.clientHeight) {
      scrollTagVal++;
    }
    if (scrollTagVal !== scrollTag.clientHeight || isFetching) {
      return;
    }
    setIsFetching(true);
  };

  const initialLoadRecord = async () => {
    setLoader(true);
    let tempHistroyData = await getHistoryDetails(
      localStorage.getItem('responsibleId'),
      offset,
      limit
    );
    setHistoryData(tempHistroyData);
    props.SETHISTORYBPDATA(tempHistroyData);
    setLoader(false);
  };
  const updateNewRecords = async () => {
    setLoader(true);
    let tempHistroyData = await getHistoryDetails(
      localStorage.getItem('responsibleId'),
      offset + limit,
      limit
    );
    setOffset(offset + limit);
    let tmpList = [...historyData, ...tempHistroyData];
    setHistoryData(tmpList);
    props.SETHISTORYBPDATA(tmpList);
    setLoader(false);
    setIsFetching(false);
  };

  const handleCancelAction = (recordValue, historyId) => {
    updatePopupProps({
      deleteRecord: recordValue,
      historyId: historyId,
      popupProps: {
        title: recordValue.name,
        icon: extractImagePath('list-blue.png'),
        showCancel: false,
        action: 'deletePopup',
        maxWidth: 'sm'
      }
    });
  };
  const getClassHandler = (row) => {
    return returnValueOrDefault(HistoryStatusClass[row?.status], '');
  };

  return (
    <>
      <div style={{ padding: '0px', overflow: 'hidden', minHeight: '100px' }}>
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '70vh' }} id="historyMain">
          {nestedIfCaseHandle(!historyData.length, !loader, false) ? (
            <h2>No History Data Available</h2>
          ) : (
            historyData?.map((row) => {
              return (
                <div className={classes.hisMainWrapper} key={`row_${row.id}`}>
                  <div style={{ padding: '8px 0px 0px 8px' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={10} pt={0} className={classes.processName}>
                        {row?.name}
                        {row?.version && (
                          <span className={classes.version}>{`v${row?.version}`}</span>
                        )}
                      </Grid>
                      <Grid item xs={2} pt={0}>
                        {HistoryStatus[row?.status] && (
                          <Chip
                            label={HistoryStatus[row?.status]}
                            style={{ padding: '0px' }}
                            className={`${classes.pt} ${classes.status} ${
                              classes[getClassHandler(row)]
                            }`}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </div>

                  {row?.instanceData.map((record) => {
                    return (
                      <div
                        key={`record_${record?.id}`}
                        className={`${classes.historyRecord} ${
                          record?.status == 'IN_PROCESS' && classes.active_in_process
                        }`}>
                        <Box key={`history_record_${record?.id}`} className={`${classes.flowRow}`}>
                          <item>
                            <img
                              src={extractImagePath('list-blue.png')}
                              className={classes.listIcon}
                            />
                          </item>
                          <item>
                            <span style={{ minWidth: '150px' }}>{record?.name}</span>
                          </item>
                          <item style={{ minWidth: '85px' }}>
                            <div className={classes[getClassHandler(record)]}>
                              {nestedIfCaseHandle(
                                record?.status,
                                HistoryStatus[record?.status],
                                ''
                              )}
                            </div>
                          </item>
                          <item style={{ minWidth: getMinimumWidth(record) }}>
                            Started {getCreatedDate(record)} {getCancelled(record)}
                            {nestedIfCaseHandle(
                              record?.status == 'FINISHED',
                              `• Finished ${convertTimestamptoUSA(record?.lastUpdatedDate)}`,
                              ''
                            )}
                          </item>
                          <item>
                            {nestedIfCaseHandle(
                              record?.status == 'CANCELLED',
                              `Cancelled By: `,
                              `Started By: `
                            )}
                            {record?.user}
                          </item>
                          {record?.status == 'IN_PROCESS' && (
                            <item style={{ float: 'right', alignItems: 'end' }}>
                              <MuiButton
                                variant="outlined"
                                className={classes.cancelBtn}
                                onClick={() => handleCancelAction(record, row.id)}>
                                Cancel Action
                              </MuiButton>
                            </item>
                          )}
                        </Box>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
        {loader && (
          <div className={classes.hisLoadMore}>
            <Box>
              <CircularProgress />
            </Box>
          </div>
        )}
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    historyBPData: state.BusinessProcessReducer.historyBPData,
    responsibleId: state.ConsumerDetailsReducer.responsibleId
  };
}
function mapDispatchToProps(dispatch) {
  return {
    SETHISTORYBPDATA: async (responsibleId, offset, limit) => {
      await dispatch(SETHISTORYBPDATA(responsibleId, offset, limit));
    },
    SETCANCELBPDATA: async (data) => {
      await dispatch(SETCANCELBPDATA(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
