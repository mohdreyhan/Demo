import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Divider,
  RefreshIcon,
  HelpOutlineIcon,
  HomeIcon,
  ArrowBackIcon,
  ArrowForwardIcon
} from '@oasis/react-core';
import useStyles from './TopSubMenu.styles';
import { ColorPallete } from '../../theme/ColorPallete';

import { connect } from 'react-redux';
import {
  GETVERIFICATIONQUESTIONNAIRE,
  GETSEARCHCONSUMERDATA,
  GETRELATIONSHIPTYPESDATA
} from '../../Actions/ConsumerDetails/ActionCreators';
import {
  CONSUMERVERIFICATION,
  CONSUMERSKIPVERIFICATION,
  ALERT_LIST_ALL,
  RESETALL
} from '../../Actions/ConsumerDetails/Actions';
import { useNavigate } from 'react-router-dom';
import Search from '../Common/AEComponents/Search/Search';
import {
  GETALLCOUNTRIES,
  GETSTATES,
 } from '../../Actions/StaticData/ActionCreators.js';

function TopMenu(props) {
  const styles = useStyles();
  const navigate = useNavigate();
  const [searchMethod, setSearchMethod] = useState([]);

  const handleClick = async (e, value , setterLoader) => {
    if (e.key === 'Enter' && value.length > 0 && searchMethod.type == 'AN') {
      if (!isNaN(parseFloat(value)) && !isNaN(value - 0)) {
        setterLoader(true)
        props.GETSEARCHCONSUMERDATA(value, searchMethod.type);
      }
    }
  };

  // Added to fetch State & County for  CITY & Street Search
  React.useLayoutEffect(() => {
  props.GETSTATICADDRESSINFO()
  props.GETRELATIONSHIPTYPESDATA();
  }, []);
 
  let timeOutId;
  const handlePartialSearch = async (e, value) => {
    if(timeOutId){clearTimeout(timeOutId)}
     timeOutId =  setTimeout(() => {
      if (value.length > 2 && searchMethod.type != 'AN' && e.key != 'Enter') {
        if (searchMethod.type == 'PN' || searchMethod.type == 'PC') {
          value = value.replace(/[-_ )(]/g, '');
        }
        props.GETSEARCHCONSUMERDATA(value, searchMethod.type);
      }
     },500)
  };
  const getCustomerInfo = (val, customerId) => {
    props.CONSUMERVERIFICATION(false);
    props.CONSUMERSKIPVERIFICATION(false);
    props.ALERT_LIST_ALL();
    localStorage.setItem('responsibleId', val.responsibleId);
    localStorage.setItem('customerId', customerId);
    localStorage.setItem('currentAccountNumber', val.id);
    localStorage.setItem('accountUuid', val.id);
    props.GETVERIFICATIONQUESTIONNAIRE(customerId);
    navigate('/consumer');
    props.RESETALL(); // Commented to fix on "No Results Found"
  };

  const getResponsibleType = (val) => {
    return props.relationshipTypesData.find((data) => data.id === val)?.name;
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        m: 0.7,
        backgroundColor: ColorPallete.Color.White,
        borderRadius: '8px !important'
      }}>
      <AppBar
        style={{ backgroundColor: ColorPallete.Color.White }}
        position="static"
        className={styles.AppBarStyle}>
        <Toolbar>
          <IconButton size="large" edge="start" aria-label="open drawer" sx={{ mr: 1 }}>
            <HomeIcon style={{ color: ColorPallete.Button.Secondary }} />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }}>
            <ArrowBackIcon style={{ color: ColorPallete.Button.Secondary }} />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }}>
            <ArrowForwardIcon style={{ color: ColorPallete.Button.Secondary }} />
          </IconButton>
          <Divider
            sx={{
              height: 25,
              m: 0.5,
              width: '2px',
              margin: '0.1px',
              color: ColorPallete.Button.Tertiary
            }}
            orientation="vertical"
          />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1, ml: 1 }}
            onClick={handleReload}>
            <RefreshIcon style={{ color: ColorPallete.Button.Secondary }} />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }}>
            <HelpOutlineIcon style={{ color: ColorPallete.Button.Secondary }} />
          </IconButton>
          <Divider
            sx={{
              height: 25,
              m: 0.5,
              width: '2px',
              margin: '0.1px',
              marginRight: '20px',
              color: ColorPallete.Button.Tertiary
            }}
            orientation="vertical"
          />
          <Search
            handleClick={handleClick}
            handlePartialSearch={handlePartialSearch}
            searchDataAfterApiCall={props.searchConsumer}
            handleOptionSelection={getCustomerInfo}
            showResponsibleType={true}
            getResponsibleType={getResponsibleType}
            showSearchMethod={true}
            searchMethod={searchMethod}
            setSearchMethod={setSearchMethod}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
function mapStateToProps(state) {
  return {
    searchConsumer: state.ConsumerDetailsReducer.searchConsumer,
    relationshipTypesData: state.ConsumerDetailsReducer.relationshipTypesData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GETSTATICADDRESSINFO : async() =>{
    dispatch(GETALLCOUNTRIES())
    dispatch(GETSTATES());
    },
    GETVERIFICATIONQUESTIONNAIRE: async (customerId) => {
      await dispatch(GETVERIFICATIONQUESTIONNAIRE(customerId));
    },
    GETSEARCHCONSUMERDATA: async (searchKey, searchMethod) => {
      await dispatch(GETSEARCHCONSUMERDATA(searchKey, searchMethod));
    },
    CONSUMERVERIFICATION: async (value) => {
      await dispatch(CONSUMERVERIFICATION(value));
    },
    ALERT_LIST_ALL: async () => {
      await dispatch(ALERT_LIST_ALL({}));
    },
    CONSUMERSKIPVERIFICATION: async (value) => {
      await dispatch(CONSUMERSKIPVERIFICATION(value));
    },
    RESETALL: async () => {
      await dispatch(RESETALL());
    },
    GETRELATIONSHIPTYPESDATA: async () => {
      await dispatch(GETRELATIONSHIPTYPESDATA());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
