import {
  Grid,
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
  SortOutlinedIcon,
  FolderOpenIcon,
  ClearIcon,
  SearchIcon,
  CircularProgress
} from '@oasis/react-core';
import { ColorPallete } from '../../../theme/ColorPallete';
import { useEffect, useState } from 'react';
import CallHistoryCard from './CallHistoryCard';
import PaymentHistoryCard from './PaymentHistoryCard';
import BusinessProcessHistoryCard from './BusinessProcessHistoryCard';
import MultiSelectBox from '../../Common/AEComponents/MultiSelect/MultiSelectBox';
import ContactUpdateHistoryCard from './ContactUpdateHistoryCard';
import ConsentCard from './ConsentCard';
import ChannelCommunicationCard from './ChannelCommunicationCard';
import ConsumerMatchingCard from './ConsumerMatchingCard';
import AccountTieCard from './AccountTieCard';
import ConsumerVerificationCard from './ConsumerVerificationCard';
import { nestedIfCaseHandle } from '../../Common/commonfunctions';
import { handleAndCase } from '../../BusinessProcess/Business.Data';

export default function AccountHistory(props) {
  const [searchValue, setSearchValue] = useState('');
  const [accountHistoryData, setAccountHistoryData] = useState([]);
  const [actionDropdownValue, setActionDropdownValue] = useState(props.CardFrom?.cards);

  useEffect(() => {
    setActionDropdownValue(props.CardFrom?.cards);
  }, [props.CardFrom?.cards]);

  const handleMultiSelectChange = (currentValue) => {
    if (currentValue.length >= 1) {
      let newList = currentValue.filter(
        ({ value: id1 }) => !actionDropdownValue?.some(({ value: id2 }) => id2 == id1)
      );
      if (actionDropdownValue?.some(({ value: id3 }) => id3 == 'all')) {
        let withoutAll = currentValue.filter(({ value: id1 }) => id1 != 'all');
        setActionDropdownValue(withoutAll);
        props.filterUpdated(withoutAll);
      } else if (newList.some(({ value: id3 }) => id3 == 'all')) {
        setActionDropdownValue([
          {
            label: 'All History',
            value: 'all'
          }
        ]);
        props.filterUpdated([
          {
            label: 'All History',
            value: 'all'
          }
        ]);
      } else {
        setActionDropdownValue(currentValue);
        props.filterUpdated(currentValue);
      }
    } else {
      setActionDropdownValue([
        {
          label: 'All History',
          value: 'all'
        }
      ]);
      props.filterUpdated([
        {
          label: 'All History',
          value: 'all'
        }
      ]);
    }
  };

  const updateSearchAndAction = async () => {
    let tempData = props.historyRecords;
    if (searchValue.length > 2) {
      let searchList = tempData
        ?.filter((arrayObjData) => {
          let codes = codesDataReturn(arrayObjData);
          return codes.includes(true);
        })
        .map((ex) => {
          let updatedVal = {};
          for (let key in ex) {
            if (typeof ex[key] != 'object') {
              updatedVal = updatedValNotObjData(ex[key], key, updatedVal);
            } else {
              updatedVal = updatedValObjData(ex[key], key, updatedVal);
            }
          }
          if (Object.keys(updatedVal).length) {
            return { ...ex, ...updatedVal };
          }
        });
      tempData = searchList;
    }
    setAccountHistoryData(tempData);
  };

  const codesDataReturn = (arrayObjData) => {
    let code = Object.keys(arrayObjData)
      ?.filter((objKey) => {
        return !props?.filterIgnore?.includes(objKey);
      })
      .map((m1) => {
        if (typeof arrayObjData[m1] != 'object') {
          if (
            typeof arrayObjData[m1] == 'string' &&
            arrayObjData[m1]?.toLowerCase()?.includes(searchValue?.toString()?.toLowerCase())
          ) {
            return true;
          }
        } else {
          return objCheckDataReturn(arrayObjData[m1]);
        }
      });
    return code;
  };

  const objCheckDataReturn = (value) => {
    let objectChecker = [];
    for (let key in value) {
      if (Array.isArray(value)) {
        let arrValues = Object.keys(value[key]);
        arrValues.forEach((val) => {
          if (objBolnDataReturn(value[key][val])) {
            objectChecker.push(true);
          }
        });
      } else {
        if (objBolnDataReturn(value[key])) {
          objectChecker.push(true);
        }
      }
    }
    if (objectChecker?.length) {
      return true;
    }
  };

  const updatedValNotObjData = (value, key, updatedVal) => {
    if (
      !props?.filterIgnore?.includes(key) &&
      value?.toLowerCase()?.includes(searchValue?.toString()?.toLowerCase()?.trim())
    ) {
      let tmpUpdater = value.toLowerCase()?.indexOf(searchValue?.toString().toLowerCase());
      if (tmpUpdater >= 0) {
        let newText =
          value.substring(0, tmpUpdater) +
          "<span className = 'highlight' style = 'color: blue ; font-weight: 700' >" +
          value.substring(tmpUpdater, tmpUpdater + searchValue.length) +
          '</span>' +
          value.substring(tmpUpdater + searchValue.length);
        updatedVal = { ...updatedVal, [key]: newText };
      }
    }
    return updatedVal;
  };

  const updatedValObjData = (value, key, updatedVal) => {
    let updatedChildObj = {};
    let objectUpdated = [];
    if (Array.isArray(value)) {
      value.forEach((childObj) => {
        let objectUpdatedVal = objectUpdatedValReturn(childObj);

        if (Object.keys(objectUpdatedVal).length) {
          let tmpRec = { ...childObj, ...objectUpdatedVal };
          updatedChildObj = { ...updatedChildObj, ...tmpRec };
          objectUpdated.push(updatedChildObj);
        } else {
          updatedChildObj = { ...updatedChildObj, ...childObj };
          objectUpdated.push(updatedChildObj);
        }
      });
    } else {
      let objectUpdatedVal = objectUpdatedValReturn(value);

      if (Object.keys(objectUpdatedVal).length) {
        let tmpRec = { ...value, ...objectUpdatedVal };
        updatedChildObj = { ...updatedChildObj, ...tmpRec };
      } else {
        updatedChildObj = { ...updatedChildObj, ...value };
      }
    }
    if (!objectUpdated.length) {
      updatedVal = { ...updatedVal, [key]: updatedChildObj };
    } else {
      updatedVal = { ...updatedVal, [key]: objectUpdated };
    }
    return updatedVal;
  };

  const objectUpdatedValReturn = (value) => {
    let objectUpdatedVal = {};
    for (let key1 in value) {
      if (objBolnDataReturn(value[key1])) {
        let tmpUpdater = value[key1]
          .toString()
          .toLowerCase()
          ?.indexOf(searchValue?.toString().toLowerCase());
        if (tmpUpdater >= 0) {
          let newText =
            value[key1].substring(0, tmpUpdater) +
            "<span className = 'highlight' style = 'color: blue ; font-weight: 700' >" +
            value[key1].substring(tmpUpdater, tmpUpdater + searchValue.length) +
            '</span>' +
            value[key1].substring(tmpUpdater + searchValue.length);
          objectUpdatedVal = {
            ...objectUpdatedVal,
            [key1]: newText
          };
        }
      }
    }
    return objectUpdatedVal;
  };

  const objBolnDataReturn = (val) => {
    if (
      typeof val != 'object' &&
      typeof val != 'boolean' &&
      val?.toString()?.toLowerCase()?.includes(searchValue?.toString()?.toLowerCase()?.trim())
    ) {
      return true;
    }
    return flag;
  };

  useEffect(() => {
    if (props?.historyRecords) {
      setAccountHistoryData(props?.historyRecords);
    }
  }, [props?.historyRecords]);

  const handleOnClick = (category, data) => {
    if (
      handleAndCase(props.CardFrom.componentIsFrom == 'SingleAccount', category == 'payment') ||
      ['CONSUMER_MATCHING', 'TIE_UNTIE', 'BUSINESS_PROCESS'].includes(category)
    ) {
      props.onClickedOnCard(data);
    }
  };

  useEffect(() => {
    updateSearchAndAction();
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.length > 2) {
      updateSearchAndAction();
    } else {
      setAccountHistoryData(props?.historyRecords);
    }
  }, [props.historyRecords]);
  useEffect(() => {
    let scrollTag = document.querySelector('#accountHistoryScroll');
    scrollTag?.addEventListener('scroll', handleScroll, false);
  }, []);
  const handleScroll = () => {
    let scrollTag = document.querySelector('#accountHistoryScroll');
    let scrollTagVal = Math.round(scrollTag.scrollHeight - scrollTag.scrollTop);
    if (scrollTagVal == scrollTag.clientHeight + 1) {
      scrollTagVal--;
    }
    if (scrollTagVal + 1 == scrollTag.clientHeight) {
      scrollTagVal++;
    }
    if (scrollTagVal !== scrollTag.clientHeight || props?.isFetching) {
      return;
    }
    props.setIsFetching(true);
  };
  return (
    <>
      <Paper sx={{ width: '100%' }} elevation={10}>
        <Box component={'div'}>
          <Grid
            container
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 'auto',
              padding: '0px 24px'
            }}>
            <Grid
              sx={{
                display: 'flex',
                height: 'auto',
                width: '100%',
                alignItems: 'center',
                borderBottom: `1px solid ${ColorPallete.Border.Primary}`,
                justifyContent: 'space-between',
                paddingTop: '10px'
              }}>
              <Grid item sx={{ display: 'flex', padding: '8px 0px' }}>
                <FolderOpenIcon sx={{ color: ColorPallete.Button.Secondary }} />
                <Typography
                  style={{
                    fontSize: '16px',
                    paddingLeft: '10px',
                    ml: '10px',
                    color: ColorPallete.Text.Primary
                  }}>
                  History
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    display: `${
                      props.CardFrom?.componentIsFrom == 'SingleAccount' ? 'none' : 'flex'
                    }`,
                    marginBottom: '10px'
                  }}>
                  <MultiSelectBox
                    options={props.typeList?.options}
                    placeholder={props.typeList?.placeholder}
                    labelaccessor={props?.typeList?.labelaccessor}
                    valueaccessor={props?.typeList?.valueaccessor}
                    value={actionDropdownValue}
                    onChange={(e) => {
                      handleMultiSelectChange(e.target.value);
                    }}
                    controlStyles={{ minWidth: '250px', maxWidth: '400px' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box
          component="div"
          sx={{
            mt: 2,
            mb: 1,
            minHeight: '80vh',
            height: '100%',
            width: '96%',
            ml: '2%'
          }}>
          <Grid container spacing={0.5}>
            <Divider />
            <Grid container sx={{ padding: '0px 10px 0px 12px' }}>
              <Grid item xs={6}>
                <OutlinedInput
                  placeholder="Search "
                  autoComplete="off"
                  id="input-search-history"
                  sx={{
                    width: '100%',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    '& .MuiOutlinedInput-input': {
                      padding: '5px 5px',
                      fontSize: '12px',
                      textOverflow: 'ellipsis'
                    }
                  }}
                  endAdornment={
                    searchValue?.length > 0 ? (
                      <InputAdornment
                        position="start"
                        sx={{ marginRight: 'unset' }}
                        onClick={() => setSearchValue('')}>
                        <ClearIcon
                          style={{
                            color: ColorPallete.Button.Secondary,
                            cursor: 'pointer',
                            height: '15px'
                          }}
                        />
                      </InputAdornment>
                    ) : (
                      ''
                    )
                  }
                  startAdornment={
                    <InputAdornment position="start" sx={{ marginRight: 'unset' }}>
                      <SearchIcon style={{ color: ColorPallete.Button.Secondary }} />
                    </InputAdornment>
                  }
                  value={searchValue}
                  onChange={(event) => {
                    setSearchValue(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={2} sx={{ textAlign: 'right' }}>
                <SortOutlinedIcon sx={{ color: ColorPallete.Button.Primary, ml: 1 }} />
              </Grid>
            </Grid>
          </Grid>
          <Box component={'div'} sx={{ mt: 2, pl: 1 }}>
            <Box
              id="accountHistoryScroll"
              sx={{
                overflowY: 'auto',
                overflowX: 'hidden',
                height: '90vh',
                pr: 1
              }}>
              {!accountHistoryData?.length > 0 && !props.loading ? (
                <Box
                  component="div"
                  sx={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: ColorPallete.Text.Primary
                  }}>
                  No records found for your selection.
                </Box>
              ) : (
                accountHistoryData?.map((historyRecord) => {
                  if (historyRecord?.category === 'calloutcome') {
                    return <CallHistoryCard key={historyRecord?.id} data={historyRecord} />;
                  } else if (historyRecord?.category === 'payment') {
                    return (
                      <PaymentHistoryCard
                        key={historyRecord?.id}
                        data={historyRecord}
                        CardFrom={props.CardFrom}
                        handleOnClick={(e) => {
                          handleOnClick(historyRecord?.category, historyRecord);
                        }}
                      />
                    );
                  } else if (historyRecord?.category === 'BUSINESS_PROCESS') {
                    return (
                      <BusinessProcessHistoryCard
                        key={historyRecord?.id}
                        data={historyRecord}
                        handleOnClick={(e) => {
                          handleOnClick(historyRecord?.category, historyRecord);
                        }}
                      />
                    );
                  } else if (historyRecord?.category === 'CONTACT_UPDATES') {
                    return <ContactUpdateHistoryCard key={historyRecord.id} data={historyRecord} />;
                  } else if (historyRecord?.category === 'consent') {
                    return <ConsentCard key={historyRecord.id} data={historyRecord} />;
                  } else if (historyRecord?.category === 'CHANNEL_COMMUNICATIONS') {
                    return <ChannelCommunicationCard key={historyRecord.id} data={historyRecord} />;
                  } else if (historyRecord?.category === 'CONSUMER_VERIFICATION') {
                    return <ConsumerVerificationCard key={historyRecord.id} data={historyRecord} />;
                  } else if (historyRecord?.category === 'CONSUMER_MATCHING') {
                    return (
                      <ConsumerMatchingCard
                        key={historyRecord.id}
                        data={historyRecord}
                        handleOnClick={(e) => handleOnClick(historyRecord.category, historyRecord)}
                      />
                    );
                  } else if (historyRecord?.category === 'CONSENT') {
                    return <ConsentCard key={historyRecord.id} data={historyRecord} />;
                  } else if (historyRecord?.category === 'TIE_UNTIE') {
                    return (
                      <AccountTieCard
                        key={historyRecord.id}
                        data={historyRecord}
                        record={props.historyRecords}
                        handleOnClick={(e) => handleOnClick(historyRecord.category, historyRecord)}
                      />
                    );
                  }
                })
              )}
            </Box>
            {props.loading && (
              <Box
                component="div"
                sx={{
                  position: 'absolute',
                  top: 'calc(50% - 4em)',
                  left: 'calc(50% - 4em)'
                }}>
                <Box>
                  <CircularProgress />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
}
