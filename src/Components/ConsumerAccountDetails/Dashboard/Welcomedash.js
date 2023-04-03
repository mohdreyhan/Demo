import React from 'react';
import { Grid } from '@oasis/react-core';
import { Button, ButtonGroup } from '@mui/material';
import { ColorPallete } from '../../../theme/ColorPallete';
import { GETKPICALLWRAPDATA } from '../../../Actions/ConsumerDetails/ActionCreators';
import { connect } from 'react-redux';
import { getDateInfo } from '../../Common/commonfunctions';
import DateRangePickerCalander from '../../Common/AEComponents/DateRangePicker/DateRangePickerCalander.js';
import { dateField } from './Welcomedash.data';

function Welcome(props) {
  const [clearAll, setClearAll] = React.useState(false);
  const today = new Date();
  const [activeTab, setActiveTab] = React.useState('Day');
  const tabs = ['Day', 'WTD', 'MTD', 'YTD'];

  React.useEffect(() => {
    let startDateVal = getDateInfo(today).todayDate;
    let endDateVal = getDateInfo(today).todayDate;
    props.GETKPICALLWRAPDATA(startDateVal, endDateVal);
  }, []);

  const onDateRangeChange = (dateRange) => {
    setClearAll(false);
    setActiveTab('');
    
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      return;
    }
    const formatDate = (date) => new Date(date.setDate(date.getDate() + 1)).toISOString().substring(0, 10);
    const startDate = formatDate(new Date(dateRange[0]));
    const endDate = formatDate(new Date(dateRange[1]));
    props.GETKPICALLWRAPDATA(startDate, endDate);
  };

  const handleClearDateRange = (setDateRange) => {
    setDateRange([null, null]);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setClearAll(true);
    let startDate = getDateInfo(today).todayDate;
    let endDate = getDateInfo(today).todayDate;
    switch (tab) {
      case 'day':
        startDate = getDateInfo(today).todayDate;
        break;
      case 'WTD':
        startDate = getDateInfo(today).weekStartDate;
        break;
      case 'MTD':
        startDate = getDateInfo(today).monthStartDate;
        break;
      case 'YTD':
        startDate = getDateInfo(today).yearStartDate;
        break;
    }
    props.GETKPICALLWRAPDATA(startDate, endDate);
  };
  return (
    <Grid
      container
      style={{
        display: 'flex',
        marginLeft: '8px',
        marginRight: '8px',
        marginTop: '22px'
      }}>
      <Grid
        item
        xs={5}
        style={{
          width: '264px',
          height: '41px',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '24px',
          lineHeight: '36px',
          color: '#000000'
        }}>
        {`Welcome Back ${props?.value ?? ''}!`}
      </Grid>
      <Grid
        rowSpacing={1}
        style={{
          paddingRight: '13px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
        item
        xs={7}
        >
        <Grid
          item
          xs={1}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: '32px',
            paddingRight: '4px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '14px',
            marginRight: '12px',
            minWidth: '3px'
          }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            {tabs.map((tab, index) => (
              <Button
                key={tab}
                onClick={() => handleTabClick(tab)}
                variant={activeTab === tab ? 'contained' : 'outlined'}
                sx={{
                  textTransform: 'none',
                  borderRadius: index == 3 ? '0px 8px 8px 0px' : '8px 0px 0px 8px',
                  color: `${ColorPallete.Button.Secondary} !important`,
                  borderColor: `${ColorPallete.Button.Secondary} !important`,
                  backgroundColor: `${ColorPallete.Color.White} !important`,
                  ...(activeTab == tab && {
                    backgroundColor: `${ColorPallete.Button.Secondary} !important`,
                    color: `${ColorPallete.Color.White} !important`,
                    textDecoration: 'underline',
                    textUnderlineOffset: '10.5px',
                    textDecorationThickness: '2.5px',
                    '&:hover': {
                      color: `${ColorPallete.Color.White} !important`,
                      textDecoration: 'underline',
                      textDecorationThickness: '2.5px'
                    }
                  })
                }}>
                {tab}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid
          xs={6}
          item
          style={{
            display: 'flex',
            textTransform: 'none',
            justifyContent: 'flex-start',
            height: '32px',
            paddingRight: '7px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '14px'
          }}>
          <Grid sx={{ display: 'flex' }}>
            <div
              style={{
                marginTop: '7px',
                fontFamily: '"Poppins"',
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '12px',
                lineHeight: '18px',
                color: ColorPallete.Border.Grid,
                marginRight: '5px',
                paddingRight: '2px'
              }}>
              Custom
            </div>
            <DateRangePickerCalander
              data={dateField}
              startDateValue={null}
              endDateValue={null}
              maxDate={new Date()}
              handleClearDateRange={handleClearDateRange}
              clearAll={clearAll}
              onDateRangeChange={onDateRangeChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
function mapStateToProps(state) {
  return {
    kpiCallWrapdata: state.ConsumerDetailsReducer.kpiCallWrapdata
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETKPICALLWRAPDATA: async (startdate, endDate) => {
      await dispatch(GETKPICALLWRAPDATA(startdate, endDate));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
